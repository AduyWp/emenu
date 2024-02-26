<template>
    <div class="q-mt-md q-px-sm">
      <div class="q-px-md q-py-sm flex items-center">
        <div class="count q-mr-sm bg-red-light text-red text-weight-bold">{{recommendedList.length}}</div>
        <p class="q-mb-none text-weight-bold text-uppercase">{{$t('home.recomended')}}</p>
      </div>
      <q-separator class="q-mb-md" />
      <span v-if="recommendedList.length">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 q-px-none q-mb-sm menu-list" 
            v-for="product in recommendedList" :key="product" 
          >
            <div
              v-ripple:blue
              class="relative-position text-weight-bold bg-white text-black card-menu text-center"
            >
              <q-card class="my-card grid-product q-pa-md no-shadow">
                <div @click.prevent="goToProductDetail(product.id, product)">
                  <div v-if="product.url !== null">
                    <q-img
                      no-spinner
                      :src="product.url"
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
                  <div class="flex justify-between h-100 items-end" @click.prevent="goToProductDetail(product.id, product)">
                    <div class="q-pa-none flex justify-between column h-100">
                      <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{product.name}}</p>
                      <p class="text-body2 text-weight-bold text-red q-my-none text-left">{{ rupiahFormat.format(product.price) }}</p>
                    </div>
                    <q-img
                      no-spinner
                      src="~/assets/icon/Button.png"
                      style="height: 20px; max-width: 20px"
                      @click.prevent="addToCart(product)"
                    ></q-img>
                  </div>
                </q-card-section>
              </q-card>
              <q-separator class="q-mt-sm" />
            </div>
          </div>
        </div>
      </span>
      <span v-else>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 q-px-none q-mb-sm menu-list" v-for="product in listProducts" :key="product" @click.prevent="goToProductDetail(product.id)">
            <div
              v-ripple:blue
              class="relative-position text-weight-bold bg-white text-black card-menu text-center"
            >
              <q-card class="my-card grid-product q-pa-md no-shadow">
                <div v-if="product.url !== null">
                  <q-img
                    no-spinner
                    :src="product.url"
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
                <q-card-section class="q-pa-none">
                  <div class="flex justify-between h-100 items-end">
                    <div class="q-pa-none flex justify-between column h-100" @click.prevent="goToProductDetail(product.id, product)">
                      <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{product.name}}</p>
                      <p class="text-body2 text-weight-bold text-red q-my-none text-left">{{ rupiahFormat.format(product.price) }}</p>
                    </div>
                    <q-img
                      no-spinner
                      src="~/assets/icon/Button.png"
                      style="height: 20px; max-width: 20px"
                      @click.prevent="addToCart(product.id, product)"
                    ></q-img>
                  </div>
                </q-card-section>
              </q-card>
              <q-separator class="q-mt-sm" />
            </div>
          </div>
        </div>
      </span>
    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import { inject } from 'vue'

export default defineComponent({
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const listProducts = ref()
    const recommendedList = ref([])
    const item = ref([])
    const dataMenu = ref([])
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
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
      // const decryptedDataItemMenus = encrypt.decryptData(localStorage.getItem('menus'));
      const decryptedDataItemMenus = localStorage.getItem('menus');

      dataMenu.value = JSON.parse(decryptedDataItemMenus)
      for (var i = 0; i < dataMenu.value.length; i++) {
        if (dataMenu.value[i].recommended) {
          recommendedList.value.push(dataMenu.value[i])
        }
      }

      $q.loading.hide()
    }

    onMounted(async () => {
      await fetchData()
    })

    const goToProductDetail = (id, product) => {
      // if (product.type === 1) {
      //   localStorage.setItem('productPackage', JSON.stringify(encrypt.encryptData(product)))
      //   router.push({path: '/emenu/productPackage/' + id})
      // } else {
      //   localStorage.setItem('product', JSON.stringify(encrypt.encryptData(product)))
      //   router.push({path: '/emenu/product/' + id})
      // }
      // localStorage.setItem('product', JSON.stringify(encrypt.encryptData(product)))
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
            has_package_id: menu.type,
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
            has_package_id: menu.type,
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
        // localStorage.setItem('product', JSON.stringify(encrypt.encryptData(menu)))
        localStorage.setItem('product', JSON.stringify(menu))
        router.push({path: '/emenu/product/' + id})
      }
    }

    return {
      listProducts,
      rupiahFormat,
      recommendedList,
      goToProductDetail,
      addToCart,
    }
  },
})
</script>