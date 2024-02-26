<template>
  <div class="q-px-md q-py-sm flex items-center bg-white fixed-position">
    <div class="flex items-center no-wrap overflow category-slide">
      <div
        class="text-capitalize q-py-xs q-px-md bg-green-extralight radius-70 border-green-light q-mr-sm"
        @click="open('bottom')"
      >
        <div class="row items-center no-wrap text-white">
          <img
            alt="Icon book"
            src="~assets/icon/dotpoints.png"
            width="18"
          >
          <div class="text-center q-ml-sm text-green-light text-weight-bold text-caption">
            {{$t('button.category')}}
          </div>
        </div>
      </div>
      <p v-for="category in listCategory" 
        :name="category.name" 
        class="q-mb-none text-weight-bold text-grey1 text-uppercase q-mr-xs text-caption min-width radius-70 q-py-xs q-px-md" 
        v-bind:class="idElement === category.name ? 'category-active' : '' " 
        @click="categoryClick(category.name)"
      >
        {{category.name}}
      </p>
    </div>
    <div @click.prevent="goToSearchPage()">
      <img
        alt="Icon search"
        src="~assets/icon/search.png"
        width="24"
        class="q-mt-xs"
      >
    </div>
  </div>
  <div class="q-gutter-y-md q-mt-xl">
    <q-card class="no-shadow">
      <div v-for="category in listCategory" v-bind:class="category.name">
        <q-separator class="q-mb-none" />
        <div :id="category.name" class="q-px-md q-py-sm flex items-center">
          <div class="count q-mr-sm bg-red-light text-red text-weight-bold">4</div>
          <p class="q-mb-none text-weight-bold text-uppercase">{{category.name}}</p>
        </div>
        <div class="row q-mb-lg">
          <div class="col-12 col-sm-12 col-md-12 q-px-none q-mb-sm menu-list" 
            v-for="menu in listMenu" :key="menu"
            v-bind:class="category.id === menu.category.id ? 'show' : 'hide'"
          >
            <q-separator />
            <span v-if="menu.category.id === category.id">
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
              </div>
            </span>
          </div>
        </div>
      </div>
    </q-card>
  </div>
  <CategoryPopup v-model="categoryPopup" :position="position" />
</template>

<script>
import { defineComponent, computed, ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import { inject } from 'vue'
import CategoryPopup from 'components/category/CategoryPopup.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CategoryPopup,
  },

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const listMenu = ref()
    const listCategory = ref()
    const showChild = ref(false);
    const bus = inject('bus')
    const idElement = ref('Fruit')
    const position = ref('top')
    const categoryPopup = ref(false)

    bus.on("scrollView", (id) => {
      categoryPopup.value = false
      setTimeout(() => {
        categoryClick(id)
      }, 500)
    })

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
      // const decryptedDataItemCategories = encrypt.decryptData(localStorage.getItem('categories'));
      // const decryptedDataItemMenus = encrypt.decryptData(localStorage.getItem('menus'));
      const decryptedDataItemCategories = localStorage.getItem('categories');
      const decryptedDataItemMenus = localStorage.getItem('menus');

      listMenu.value = JSON.parse(decryptedDataItemMenus)
      listCategory.value = JSON.parse(decryptedDataItemCategories)
    }

    const scrollEvent = () => {
      window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Assuming there's only one element with the class 'category-slide'
        var tabW = document.getElementsByClassName('category-slide')[0];

        var tabWidth = tabW.getBoundingClientRect().width; // Access the 'width' property

        for (var i = 0; i < listCategory.value.length; i++) {
          var tab = document.getElementsByName(listCategory.value[i].name)[0];
          var content = document.getElementsByClassName(listCategory.value[i].name)[0];
          var contentPos = content.offsetTop;
          var contentHeight = content.offsetHeight;

          if (scrollPosition >= contentPos && scrollPosition < contentPos + contentHeight) {
            tab.classList.add('category-active');
            
            // Center the active tab horizontally
            var tabRect = tab.getBoundingClientRect();
            var tabLeft = tabRect.left;
            if (tab.classList.contains('category-active') && tabRect.left >= tabWidth || tab.classList.contains('category-active') && tabRect.left <= tabWidth) {
              var windowCenterX = tabWidth / 2;
              var tabCenterX = tabRect.left + tabRect.width / 2;
              var scrollX = tabCenterX - windowCenterX;
              
              // Use Math.round to avoid fractional pixel values
              scrollX = Math.round(scrollX);
              tabW.scrollBy({ left: scrollX, behavior: 'smooth' });
            }
          } else {
            tab.classList.remove('category-active');
          }
        }
      });
    }

    onMounted(async () => {
      await fetchData()
      scrollEvent()
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

    const categoryClick = (id) => {
      idElement.value = id
      const element = document.getElementById(id);
      window.scroll({
        top: element.offsetTop, // 100px is the additional margin you want to add
        left: 0, 
        behavior: 'smooth' 
      })
    }

    return {
      listMenu,
      rupiahFormat,
      listCategory,
      goToProductDetail,
      addToCart,
      categoryClick,
      categoryPopup,
      idElement,
      position,
      goToCart () {
        window.location.href = '/emenu/cart'
      },
      open (pos) {
        position.value = pos
        categoryPopup.value = true
      },
      close () {
        categoryPopup.value = false
      },
      goToSearchPage () {
        router.push('/emenu/search')
      },
    }
  }
})
</script>
