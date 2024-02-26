<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click="$router.go(-1)">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{dataItem.name}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-gutter-y-md q-mt-md">
          <q-card class="no-shadow">
            <div class="q-px-md flex justify-between">
              <p class="text-black text-body2 text-weight-bold q-mb-none">{{dataItem.name}}</p>
              <p class="text-black text-body2 text-weight-normal q-mb-none">{{rupiahFormat.format(dataItem.price)}}</p>
            </div>
            <div class="q-mt-sm q-px-md">
              <p class="text-caption text-grey1 q-mb-none">Item 1: Pick one</p>
            </div>
            <q-separator class="q-my-md" />
            <div class="q-mt-sm q-px-none">
              <div class="row">
                <div class="col-6 col-sm-4 col-md-4 q-px-sm q-mb-md menu-list" 
                  v-for="menu in packageMenu" :key="menu"
                  @click.prevent="goToProductDetail(menu.id, menu)"
                >
                  <span>
                    <div
                      v-ripple:blue
                      class="relative-position text-weight-bold bg-white text-black card-menu text-center"
                    >
                      <!-- {{dataItem}} -->
                      <q-card class="my-card q-pa-md">
                        <span v-if="menu.url !== null">
                          <q-img
                            no-spinner
                            :src="menu.url"
                            style="height: 155px; max-width: 100%"
                          ></q-img>
                        </span>
                        <span v-else>
                          <q-img
                            no-spinner
                            src="~/assets/image-default.png"
                            style="height: 155px; max-width: 100%"
                          ></q-img>
                        </span>
                        <q-separator />
                        <q-card-section class="q-px-none q-pb-none">
                          <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none text-left">{{menu.name}}</p>
                        </q-card-section>
                      </q-card>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const listMenu = ref()
    const dataItem = ref()
    const packageMenu = ref([])
    const step = route.query.step
    const currentStep = step ? parseInt(step) : 0
    
    // const decryptedDataItem  = localStorage.getItem('productPackage')
    // dataItem.value = encrypt.decryptData(JSON.parse(decryptedDataItem))
    dataItem.value = localStorage.getItem('productPackage')

    console.log(dataItem.value)
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
          listMenu.value = data.menus
          for (var i = 0; i < data.menus.length; i++) {
            for (var j = 0; j < dataItem.value.package_item[currentStep].length; j++) {
              const itemPackage = dataItem.value.package_item[currentStep][j]
              if (data.menus[i].id === itemPackage) {
                packageMenu.value.push(data.menus[i])
              }
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

    const goToProductDetail = (id, product) => {
      // localStorage.setItem('product', JSON.stringify(encrypt.encryptData(product)))
      // localStorage.setItem('productPackage', JSON.stringify(encrypt.encryptData(dataItem.value)))
      localStorage.setItem('product', JSON.stringify(product))
      localStorage.setItem('productPackage', JSON.stringify(dataItem.value))
      router.push({path: '/emenu/product/' + id, query: { currentStep }})
    }

    return {
      listMenu,
      rupiahFormat,
      router,
      dataItem,
      listMenu,
      packageMenu,
      goToProductDetail,
    }
  },
})
</script>
