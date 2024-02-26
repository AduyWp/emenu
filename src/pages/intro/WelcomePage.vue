<template>
  <q-page class="relative-position">
    <div class="w-100">
      <img
        alt="background"
        src="~assets/intro/background.png"
        class="background full-width"
      >
      <div class="seat absolute-right flex items-center no-bottom bg-white q-py-sm q-px-md">
        <img
          alt="Logo seat"
          src="~assets/intro/seat.png"
          width="24"
        >
        <p class="q-ma-none q-ml-sm text-caption text-weight-bold text-red">{{tableData.name}}</p>
      </div>
    </div>
    <div class="relative-position">
      <div class="content bg-white absolute full-width q-pt-xl">
        <div class="wrapper">
          <div class="logo text-center absolute">
            <img
              alt="Logo Store"
              class="radius-50-percent"
              :src="outletData.url"
            >
          </div>
          <div class="text-center">
            <h6 class="text-h4 text-weight-medium text-black q-mb-none">{{outletData.name}}</h6>
            <p class="text-body1 text-weight-medium text-grey q-mt-sm">{{outletData.address}}</p>
          </div>
          <div class="q-mt-md list-about q-px-md q-mt-lg q-mb-lg">
            <q-list>
              <q-item class="items-center q-py-none">
                <q-item-section avatar class="items-start q-pr-none">
                  <img
                    alt="Icon location"
                    src="~assets/intro/icon/location.png"
                    width="24"
                  >
                </q-item-section>

                <q-item-section class="ellipsis block">{{outletData.address}}</q-item-section>
                <a :href="mapsToAddress" class="text-primary link-maps" target="__blank">
                  <q-item-section class="items-end text-primary text-weight-bold maps-direction">
                  {{$t('intro.see_maps')}}</q-item-section>
                </a>
              </q-item>

              <q-item class="items-center q-py-none">
                <q-item-section avatar class="items-start q-pr-none row">
                  <img
                    alt="icon clock"
                    src="~assets/intro/icon/clock.png"
                    width="22"
                  >
                </q-item-section>
                <span v-if="userTime <= moment(outletData.end_time,'HHmm').format('HH:mm') && userTime >= moment(outletData.start_time,'HHmm').format('HH:mm')">
                  <q-item-section class="open-now items-center">
                    {{$t('intro.clock_open')}}
                    <span class="text-green text-weight-bold open-hour q-ml-xs">{{$t('intro.open_now')}},</span>
                    <span class="text-black text-weight-normal q-ml-xs">{{$t('intro.close')}}</span>
                    <span class="text-black text-weight-medium q-ml-xs">{{moment(outletData.end_time,'HHmm').format('HH:mm')}}</span>
                  </q-item-section>
                </span>
                <span v-else>
                  <q-item-section class="open-now items-center">
                    {{$t('intro.clock_open')}}
                    <span class="text-red text-weight-bold open-hour q-ml-xs">{{$t('intro.close')}},</span>
                    <span class="text-black text-weight-normal q-ml-xs">{{$t('intro.open_now')}}</span>
                    <span class="text-black text-weight-medium q-ml-xs">{{moment(outletData.start_time,'HHmm').format('HH:mm')}}</span>
                  </q-item-section>
                </span>
                <!-- <q-expansion-item class="full-width row open-container">
                  <template v-slot:header>
                    <q-item-section avatar class="items-start q-pr-none row">
                      <img
                        alt="icon clock"
                        src="~assets/intro/icon/clock.png"
                        width="22"
                      >
                    </q-item-section>
                    <q-item-section class="open-now items-center">
                      {{$t('intro.clock_open')}}
                      <span class="text-green text-weight-bold open-hour q-ml-xs">{{$t('intro.open_now')}},</span>
                      <span class="text-black text-weight-normal q-ml-xs">{{$t('intro.close')}} 22.00</span>
                    </q-item-section>
                  </template>
                  <q-card>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.sunday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.monday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.tuesday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.wednesday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.thursday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.friday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                    <q-card-section class="q-px-none q-pt-sm q-pb-none text-grey flex items-center justify-between full-width">
                      <p class="text-body2 q-my-none text-weight-normal">{{$t('intro.saturday')}}</p>
                      <p class="text-body2 q-my-none text-weight-normal">08:00-22:00</p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item> -->
              </q-item>
              <q-item class="items-center q-py-none">
                <q-item-section avatar class="items-start q-pr-none">
                  <img
                    alt="icon whatsapp"
                    src="~assets/intro/icon/location.png"
                    width="24"
                  >
                </q-item-section>

                <q-item-section class="ellipsis block text-primary text-weight-medium"><a class="ellipsis block text-primary text-weight-medium" :href="`tel: ${outletData.telephone}`">{{$t('intro.call_outlet')}}</a></q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-separator class="q-my-lg" />
          <div class="action q-px-lg q-mb-lg text-center flex justify-center align-center">
            <q-btn
              rounded
              outline
              color="black"
              size="md"
              class="text-capitalize q-py-sm q-px-lg left"
              :label="$t('button.language')"
              icon="translate"
              @click="open('bottom')"
            />
            <q-btn
              rounded
              size="md"
              class="text-capitalize q-py-sm q-px-lg bg-gradient-yellow right"
              :label="$t('button.order_now')"
              @click="goToChoosePage"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <Popup v-model="loginPopup" :position="position" /> -->
    <SelectLanguage v-model="language" :position="position" />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { getDistance } from 'geolib'
import * as geolib from 'geolib'
import { useGeolocation } from '@vueuse/core'
import moment from 'moment-timezone'
// import Popup from 'components/intro/Popup.vue'
import SelectLanguage from 'components/intro/SelectLanguage.vue'
import StoreAuthRepository from 'repositories/storeAuth.repository'
const storeAuthRepo = new StoreAuthRepository()
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import AuthModel from 'models/auth.model'
const auth = new AuthModel()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'IndexPage',
  components: {
    // Popup,
    SelectLanguage
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const loginPopup = ref(false)
    const language = ref(false)
    const position = ref('top')
    const mapsToAddress = ref('')
    const outletList = ref([])
    const currentLat = ref(null)
    const currentLng = ref(null)
    const outletData = ref('')
    const address = ref('')
    const mapsLink = ref()
    const userTime = ref('')
    const tableData = ref('')
    const userIsAuthenticated = ref('')

    const dateNow = new Date()
    userTime.value = moment(dateNow,"HHmm").format("HH:mm")

    const { 
      coords,
      locatedAt,
      error
    } = useGeolocation()

    const posisiUser = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    localStorage.clear()
    config.destroy('outletData')
    config.destroy('user')
    config.destroy('voucher')
    config.destroy('addToCart')

    // localStorage.setItem('storeName', encrypt.encryptData(route.query.storeName))
    // localStorage.setItem('outlet', encrypt.encryptData(route.query.outlet))
    // localStorage.setItem('nik', encrypt.encryptData(route.query.nik))
    // localStorage.setItem('table_id', encrypt.encryptData(route.query.table_id))
    // localStorage.setItem('use_address', encrypt.encryptData(route.query.use_address))
    localStorage.setItem('storeName', route.query.storeName)
    localStorage.setItem('outlet', route.query.outlet)
    localStorage.setItem('nik', route.query.nik)
    localStorage.setItem('table_id', route.query.table_id)
    localStorage.setItem('use_address', route.query.use_address)

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      await storeAuthRepo.getAccessToken().then((data) => {
        try{
          // localStorage.setItem('bearer', encrypt.encryptData(data.accessToken))
          // localStorage.setItem('bearer', encrypt.encryptData(data.accessToken))
          localStorage.setItem('bearer', data.accessToken)
          localStorage.setItem('store', data.user.store_id)
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })
      await storeAuthRepo.storeSetting().then((data) => {
        try{
          // localStorage.setItem('store_id', encrypt.encryptData(data.setting.store_id))
          localStorage.setItem('store_id', data.setting.store_id)
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })
      await storeAuthRepo.outletList().then((data) => {
        try{
          outletList.value = data.outlets
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      await authRepo.getTadaToken().then((dataTada) => {
        // localStorage.setItem('tadaToken', encrypt.encryptData(dataTada.result.access_token))
        localStorage.setItem('tadaToken', dataTada.result.access_token)
      })
      // get location
      watchEffect(
        () => {
          currentLat.value = posisiUser.value.lat
          currentLng.value = posisiUser.value.lng
        }
      )

      const buildDistances = async () => {
        for (var i = 0; i < outletList.value.length; i++) {
          const data = outletList.value[i]

          if (data.id !== 0) {
            const response = await window.initMap({ lat: currentLat.value, lng: currentLng.value }, data.address, outletList.value.length)

            outletList.value[i].distance = response.rows[0].elements[0].distance.value / 1000
            if (i === outletList.value.length - 1) {
              outletList.value = outletList.value.sort((a, b) => { return a.distance - b.distance })
              // localStorage.setItem('outlet_id', encrypt.encryptData(outletList.value[0].id))
              localStorage.setItem('outlet_id', outletList.value[0].id)
              // localStorage.setItem('outlet_id', outletList.value[0].id)
            }
          }
        }
      }

      buildDistances()

      outletList.value = outletList.value.map((data, index) => {
        if(data.id !== 0){
          return data
        }
      })

      await storeAuthRepo.outletData().then((data) => {
        try {
          outletData.value = data.outlet
          config.show('outletData').then((storeData) => {
            // Update
            config.update('outletData', data.outlet)
          }).catch((e) => {
            // Store
            config.store('outletData', data.outlet)
          })
          // localStorage.setItem('tax', encrypt.encryptData(data.outlet.tax_service.tax))
          localStorage.setItem('tax', data.outlet.tax_service.tax)
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      await storeAuthRepo.tableData().then((data) => {
        try{
          tableData.value = data.table
          // localStorage.setItem("tableNo", encrypt.encryptData(data.table.id))
          // localStorage.setItem("tableName", encrypt.encryptData(data.table.name))
          localStorage.setItem("tableNo", data.table.id)
          localStorage.setItem("tableName", data.table.name)
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      //check login or not for modal popup
      try {
        const user = await auth.isLogin()
        userIsAuthenticated.value = user.value
      } catch(e) {

      }

      if (!userIsAuthenticated.value) {
        const openFirstModal = (pos) => {
          position.value = pos
          loginPopup.value = true
        }

        setTimeout(() => {
          openFirstModal('bottom')
        }, 500)

      }

      await menuRepo.getCategoryList().then((data) => {
        try{
          // localStorage.setItem('categories', encrypt.encryptData(JSON.stringify(data.categories)))
          localStorage.setItem('categories', JSON.stringify(data.categories))
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      await menuRepo.getMenuList().then((data) => {
        try{
          // localStorage.setItem('menus', encrypt.encryptData(JSON.stringify(data.menus)))
          localStorage.setItem('menus', JSON.stringify(data.menus))
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
      address.value = outletData.value.address
      mapsLink.value = 'https://www.google.com/maps/search/?api=1&query=' + address.value
      mapsToAddress.value = mapsLink.value
    })

    return {
      position,
      loginPopup,
      language,
      mapsToAddress,
      coords,
      outletData,
      userTime,
      moment,
      tableData,
      open (pos) {
        position.value = pos
        language.value = true
      },
      close () {
        language.value = false
      },
      goToChoosePage () {
        router.push({path: '/choosing'})
      }
    }
  },
})
</script>
