<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="backToLogin">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('verify.header_title')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="no-shadow">
          <q-card-section class="q-mb-none q-pb-none">
            <h5 class="text-weight-bold text-center text-capitalize q-mb-sm text-title">{{$t('verify.page_title')}}</h5>
            <p class="text-center text-body-1 text-grey q-pt-none q-mb-none">{{$t('verify.page_sub_title')}}</p>
            <p class="text-black text-weight-bold q-mb-none q-mt-xs text-center q-mb-md">{{ route.query.phone }}</p>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="onSubmitVerify">
              <div class="row justify-center q-mb-lg">
                <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input q-mx-sm text-center text-weight-bolder text-h6 text-yellow"
                  separator=""
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"/>
              </div>
              <div>
                <q-btn
                  class="q-px-xl q-py-sm radius-50 text-weight-bold q-ml-sm full-width intro-shadow text-capitalize bg-gradient-yellow"
                  unelevated
                  style="min-height: 50px"
                  text-color="white"
                  :label="$t('button.verify')"
                  type="submit"
                  size="md"
                />
              </div>
            </q-form>
            <div class="text-center q-mt-lg">
              <p class="cursor-pointer text-grey text-weight-medium q-mb-none">{{$t('verify.wrong_number')}}</p>
              <span
                class="cursor-pointer text-yellow text-weight-medium" @click.prevent="backToLogin"
                >{{$t('verify.change_number')}}</span
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import VOtpInput from 'vue3-otp-input'
import { useRouter, useRoute } from 'vue-router'
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()
import UserRepository from 'repositories/user.repository'
const userRepo = new UserRepository()
import AuthModel from 'models/auth.model'
const auth = new AuthModel()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'VerifyPage',
  components: {
    VOtpInput
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const otpInput = ref(null)
    const otpDigit = ref()
    const phone = ref('')
    const accessToken = ref('')
    const cardno = ref('')
    const pin = ref('')
    const routerFrom = route.query.from

    // const decryptedStoreName = localStorage.getItem("storeName")
    // const decryptedOutlet = localStorage.getItem("outlet")
    // const decryptedNik = localStorage.getItem("nik")
    // const decryptedTableId = localStorage.getItem("table_id")
    // const decryptedUseAddress = localStorage.getItem("use_address")

    const handleOnComplete = (value) => {
      otpDigit.value = value
    }

    const handleOnChange = (value) => {
      otpDigit.value = value
    }

    const backToLogin = () => {
      if (routerFrom) {
        router.push({path: '/login', query: { from: routerFrom }})
      } else {
        router.push('/login')
      }
    }

    const onSubmitVerify = async () => {
      $q.loading.show({
        message: 'Sedang melakukan verifikasi. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
      phone.value = route.query.phone
      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      accessToken.value = localStorage.getItem("tadaToken")

      // const decryptedCardno = localStorage.getItem('cardno')
      // cardno.value = encrypt.decryptData(decryptedCardno)
      cardno.value = localStorage.getItem('cardno')
      pin.value = otpDigit.value

      await authRepo.validateTadaOtp(accessToken.value, phone.value, cardno.value, pin.value).then((checkOtp) => {
        try{
          if (checkOtp.result.data.token === pin.value) {
            setTimeout(() => {
              $q.loading.hide()
              // localStorage.setItem('phone', encrypt.encryptData(phone.value))
              localStorage.setItem('phone', phone.value)
              // window.location.href = '/choosing?storeName=' + encrypt.decryptData(decryptedStoreName) + '&nik=' + encrypt.decryptData(decryptedNik) + '&table_id=' + encrypt.decryptData(decryptedTableId) + '&outlet=' + encrypt.decryptData(decryptedOutlet) + '&use_address=' + encrypt.decryptData(decryptedUseAddress)
              if (routerFrom) {
                router.push(routerFrom)
              } else {
                router.push({path: '/user/membership'})
              }
            }, 1000)
          }
        } catch {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: checkOtp.message,
            position: 'top'
          })
        }
      })

      await userRepo.cardDetail().then((data) => {
        try{
          auth.login(data.result)
          // localStorage.setItem('tadaMember', encrypt.encryptData(JSON.stringify(data.result)))
          localStorage.setItem('tadaMember', JSON.stringify(data.result))
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })
    }

    return {
      otpInput,
      route,
      onSubmitVerify,
      backToLogin,
      handleOnComplete,
      handleOnChange
    }
  }
})
</script>

<style>
.otp-input {
  width: 40px;
  height: 50px;
  padding: 5px;
  margin: 0 5px;
  font-size: 22px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input:focus-visible{
  outline: 2px solid #FFD00A;
  border: 0;
}
</style>
