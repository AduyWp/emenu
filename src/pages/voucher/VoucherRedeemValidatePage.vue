<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="voucherPage">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('voucher.validate_header')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="no-shadow">
          <q-card-section class="q-mb-none q-pb-none">
            <p class="text-center text-body-1 text-black1 q-pt-none q-mb-none">{{$t('voucher.validate_title')}}</p>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="onSubmit">
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
                  :label="$t('button.redeemVoucher')"
                  type="submit"
                  size="md"
                />
              </div>
            </q-form>
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
import VoucherRepository from 'repositories/voucher.repository'
const voucherRepo = new VoucherRepository()
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'VoucherRedeemValidatePage',
  components: {
    VOtpInput
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const otpInput = ref(null)
    const otpDigit = ref()
    const walletName = ref()
    const cardPin = ref()
    const selectedVariant = ref()
    const voucherId = ref()
    const pointVoucher = ref()
    const accessToken = ref()
    const phone = ref()
    const cardno = ref()
    const pin = ref()
    const fromCart = route.query.from
    const subtotal = route.query.subtotal

    const handleOnComplete = (value) => {
      otpDigit.value = value
    }

    const handleOnChange = (value) => {
      otpDigit.value = value
    }

    const voucherPage = () => {
      router.push('/emenu/voucher')
    }

    const onSubmit = async () => {
      $q.loading.show({
        message: 'Sedang menukarkan point. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      walletName.value = route.query.walletName
      cardPin.value = route.query.cardPin
      selectedVariant.value = route.query.variant
      voucherId.value = route.query.itemId
      pointVoucher.value = route.query.pointVoucher

      // const decryptedPhone = localStorage.getItem("phone")
      // phone.value = encrypt.decryptData(decryptedPhone)
      phone.value = localStorage.getItem("phone")
      
      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      accessToken.value = localStorage.getItem("tadaToken")

      // const decryptedCardno = localStorage.getItem("cardno")
      // cardno.value = encrypt.decryptData(decryptedCardno)
      cardno.value = localStorage.getItem("cardno")
      pin.value = otpDigit.value

      await authRepo.validateTadaOtp(accessToken.value, phone.value, cardno.value, pin.value).then((checkOtp) => {
        try{
          if (checkOtp.result.data.token === pin.value) {
            voucherRepo.orderVoucher(walletName.value, cardPin.value, selectedVariant.value, voucherId.value).then((data) => {
              if (data.error === false) {
                $q.loading.hide()
                router.push({path: '/emenu/voucher/redeem/success', query: {pointVoucher: pointVoucher.value, from: fromCart, subtotal: subtotal}})
              } else { 
                $q.loading.hide()
                $q.notify({
                  type: 'negative',
                  message: data.message,
                  position: 'top'
                })
              }
            })
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

      $q.loading.hide()
    }

    return {
      otpInput,
      voucherPage,
      handleOnComplete,
      handleOnChange,
      onSubmit,
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
