<template>
    <div class="column q-mt-lg q-px-md">
      <div class="col q-pa-none">
        <div
          class="col relative-position"
        >
          <div class="row items-center">
            <div class="text-left column q-mr-sm">
              <span class="text-h6 text-weight-bold text-black text-left">{{$t('home.new_title')}}</span>
            </div>
            <img
              alt="Logo seat"
              src="~assets/home/icon/frame-emot.png"
              width="24"
              height="24"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-none q-px-none">
      <span v-if="newProducts.length">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
          <Slide v-for="products in newProducts" :key="products" @click.prevent="goToProductDetail(products.id, products)">
            <div class="carousel__item">
              <div class="items-image relative-position">
                <span v-if="products.url !== null">
                  <q-img
                    no-spinner
                    class="radius-10"
                    :src="products.url"
                    style="height: 187px; max-width: 100%"
                  ></q-img>
                </span>
                <span v-else>
                  <q-img
                    no-spinner
                    class="radius-10"
                    src="~/assets/image-default.png"
                    style="height: 247px; max-width: 100%"
                  ></q-img>
                </span>
                <div class="badge bg-green-light radius-50 text-white absolute-bottom">
                  <span>{{$t('home.new_badge')}}</span>
                </div>
              </div>
              <div class="description q-mt-sm">
                <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{ products.name }}</p>
                <p class="text-caption text-weight-normal text-red q-my-none text-left">{{ rupiahFormat.format(products.price) }}</p>
              </div>
            </div>
          </Slide>
        </Carousel>
      </span>
      <span v-else>
        <Carousel v-bind="settings" :breakpoints="breakpoints">
          <Slide v-for="products in listProducts" :key="products" @click.prevent="goToProductDetail(products.id, products)">
            <div class="carousel__item">
              <div class="items-image relative-position">
                <span v-if="products.url !== null">
                  <q-img
                    no-spinner
                    class="radius-10"
                    :src="products.url"
                    style="height: 247px; max-width: 100%"
                  ></q-img>
                </span>
                <span v-else>
                  <q-img
                    no-spinner
                    class="radius-10"
                    src="~/assets/image-default.png"
                    style="height: 247px; max-width: 100%"
                  ></q-img>
                </span>
                <div class="badge bg-green-light radius-50 text-white absolute-bottom">
                  <span>{{$t('home.new_badge')}}</span>
                </div>
              </div>
              <div class="description q-mt-sm">
                <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{ products.name }}</p>
                <p class="text-caption text-weight-normal text-red q-my-none text-left">{{ rupiahFormat.format(products.price) }}</p>
              </div>
            </div>
          </Slide>
        </Carousel>
      </span>
    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Carousel, Slide } from 'vue3-carousel'
import { useQuasar } from 'quasar'
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'NewProducts',
  components: {
    Carousel,
    Slide
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'start'
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      0: {
        itemsToShow: 1.5,
        snapAlign: 'start'
      },
      768: {
        itemsToShow: 2.5,
        snapAlign: 'start'
      }
    }
  }),
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const newProducts = ref([])
    const listProducts = ref()

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

      await menuRepo.getMenuList().then((data) => {
        try{
          listProducts.value = data.menus.slice(0, 6)
          for (var i = 0; i < data.menus.length; i++) {
            if (data.menus[i].favorite) {
              newProducts.value.push(data.menus[i])
            }
          }
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })
      $q.loading.hide()
    }

    onMounted(async () => {
      await fetchData()
    })

    const goToProductDetail = (id, products)  => {
      if (products.type === 1) {
        // localStorage.setItem('product', JSON.stringify(encrypt.encryptData(product)))
        localStorage.setItem('product', JSON.stringify(product))
        router.push({path: '/emenu/productPackage/' + id})
      } else {
        // localStorage.setItem('product', JSON.stringify(encrypt.encryptData(products)))
        localStorage.setItem('product', JSON.stringify(products))
        router.push({path: '/emenu/product/' + id})
      }
    }

    return {
      listProducts,
      newProducts,
      rupiahFormat,
      goToProductDetail,
    }
  },
})
</script>
