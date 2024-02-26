<template>
  <q-header>
    <q-toolbar class="q-px-md q-py-md bg-white">
      <q-toolbar-title class="flex items-center justify-center relative-position no-wrap">
        <img
          alt="icon back"
          class="q-mr-md"
          src="~assets/icon/arrow-left-black.png"
          width="24"
          height="24"
          @click="goToHomepage"
        >
        <q-input placeholder="Apa yang sedang anda cari" class="q-pa-none w-100 search-field" outlined v-model="searchMenu" v-on:keyup="filteredMenu">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-page-container>
    <q-page>
      <div class="q-gutter-y-md">
        <q-card class="no-shadow">
          <div v-if="filteredMenu.length > 0">
            <q-separator class="q-mb-none separator-section" />
            <div class="q-px-md q-py-md flex items-center">
              <p class="q-mb-none text-weight-bold text-capitalize">{{$t('search.title')}}</p>
            </div>
            <q-separator class="q-mb-md" />
            <div class="row">
              <div class="col-12 col-sm-12 col-md-12 q-px-none q-mb-sm menu-list" 
                v-for="menu in filteredMenu" :key="menu"
              >
                <div
                  v-ripple:blue
                  class="relative-position text-weight-bold bg-white text-black card-menu text-center"
                >
                  <q-card class="my-card grid-product q-pa-md no-shadow">
                    <div @click.prevent="goToProductDetail(menu.id, menu)">
                      <div v-if="menu.url !== null">
                        <q-img
                          no-spinner
                          :src="menu.url"
                          style="height: 115px; max-width: 100%"
                          class="radius-10"
                        ></q-img>
                      </div>
                      <div v-else>
                        <q-img
                          no-spinner
                          src="~/assets/image-default.png"
                          style="height: 115px; max-width: 100%"
                          class="radius-10"
                        ></q-img>
                      </div>
                    </div>
                    <q-card-section class="q-pa-none">
                      <div class="flex justify-between h-100 items-end">
                        <div class="q-pa-none flex justify-between column h-100" @click.prevent="goToProductDetail(menu.id, menu)">
                          <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{menu.name}}</p>
                          <p class="text-body2 text-weight-bold text-red q-my-none text-left">{{ rupiahFormat.format(menu.price) }}</p>
                        </div>
                        <q-img
                          no-spinner
                          src="~/assets/icon/Button.png"
                          style="height: 20px; max-width: 20px"
                          @click.prevent="addToCart(menu.id, menu)"
                        ></q-img>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-separator class="q-mt-sm" />
                </div>
              </div>
            </div>
          </div>
          <div class="text-center q-mt-xl q-px-md" v-else>
            <img
              alt="icon empty"
              src="~assets/icon/empty.png"
              width="120"
            >
            <p class="text-body2 w-80 margin-auto margin-top">{{$t('search.empty')}} <b>'{{searchMenu}}'</b>. {{$t('search.empty1')}}</p>
          </div>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import { inject } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    
  },

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const listMenu = ref([])
    const item = ref([])
    const searchMenu = ref('')
    const bus = inject('bus')

    localStorage.removeItem('product')
    localStorage.removeItem('productPackage')

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    const fetchData = async () => {
      // const decryptedDataItemMenus = encrypt.decryptData(localStorage.getItem('menus'));
      // const decryptedDataItemMenus = localStorage.getItem('menus');
      listMenu.value = JSON.parse(localStorage.getItem('menus'));
    }

    onMounted(async () => {
      await fetchData()
    })

    const searchMenuData = ref(listMenu)

    const filteredMenu = computed(() => {
      const query = searchMenu.value.toLowerCase();
      return listMenu.value.filter(item => item.name && item.name.toLowerCase().includes(query));
    })

    const goToProductDetail = (id, product) => {
      // if (product.type === 1) {
      //   localStorage.setItem('productPackage', JSON.stringify(encrypt.encryptData(product)))
      //   router.push({path: '/emenu/productPackage/' + id})
      // } else {
      //   localStorage.setItem('product', JSON.stringify(encrypt.encryptData(product)))
      //   router.push({path: '/emenu/product/' + id})
      // }
      localStorage.setItem('product', JSON.stringify(product))
      router.push({path: '/emenu/product/' + id})
    }

    const addToCart = async (id, menu) => {
      if (menu.modifier.length === 0) {
        try{
          const data = await config.show('addToCart')
          // Update
          const itemList = data.value
          const newItem = {
            id: menu.id,
            category_id: menu.category.id, 
            product_id: menu.id,
            picture: menu.url,
            sku: menu.sku,
            name: menu.name,
            note: "",
            recipe_id: menu.recipe_id,
            cost_price: menu.cost_price,
            price: menu.other_prices[0].price,
            price_cut: 0,
            price_id: menu.other_prices[0].id,
            quantity: 1,
            tax: menu.tax,
            discount: 0,
            status: menu.status,
            modifier: [],

          }
          itemList.push(newItem)
          await config.update('addToCart', JSON.parse(JSON.stringify(itemList)))
          bus.emit('cart-updated')
        } catch {
          // store
          const firstItem = [{
            id: menu.id,
            category_id: menu.category.id, 
            product_id: menu.id,
            picture: menu.url,
            sku: menu.sku,
            name: menu.name,
            note: "",
            recipe_id: menu.recipe_id,
            cost_price: menu.cost_price,
            price: menu.other_prices[0].price,
            price_cut: 0,
            price_id: menu.other_prices[0].id,
            quantity: 1,
            tax: menu.tax,
            discount: 0,
            status: menu.status,
            modifier: [],
          }]
          await config.store('addToCart', JSON.parse(JSON.stringify(firstItem)))
          bus.emit('cart-updated')
        }
      } else {
        localStorage.setItem('product', JSON.stringify(menu))
        router.push({path: '/emenu/product/' + id})
      }
    }

    return {
      listMenu,
      rupiahFormat,
      goToProductDetail,
      addToCart,
      searchMenu,
      filteredMenu,
      goToCart () {
        window.location.href = '/emenu/cart'
      },
       goToHomepage () {
        router.push({path:'/emenu/homepage'})
      }
    }
  }
})
</script>
