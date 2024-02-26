<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md bg-white">
        <q-toolbar-title class="flex items-center login-page justify-between" @click.prevent="backToOnboarding">
          <img
            alt="icon back"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('login.header_title')}}</p>
          <p class="text-body2 text-weight-medium q-my-none q-ml-sm text-primary">{{$t('login.next_time')}}</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="login">
      <q-page class="relative-position">
        <div class="w-100">
          <img
            alt="background"
            src="~assets/login/background.png"
            class="background full-width"
          >
        </div>
        <div class="relative-position">
          <div class="content bg-white absolute full-width q-pt-xl">
            <div class="wrapper">
              <div class="q-my-none">
                <h6 class="text-h4 text-weight-medium text-black q-mb-none">{{$t('form.phone_input')}}</h6>
              </div>
              <form @submit.prevent="onSubmit" class="q-mt-sm">
                <q-input outlined v-model="phone" class="q-mb-xs"
                  :rules="[
                    val => !!val || $t('validation.required'),
                    val => val.length >= 10 || $t('validation.min_digit_length', {number: 10}),
                    val => isNumeric(val) || $t('validation.numeric'),
                  ]"
                  type="number"
                  :placeholder="$t('form.placeholder_input_phone')"
                  lazy-rules>
                  <template v-slot:prepend class="text-body2">
                    +62
                  </template>
                </q-input>
                <p class="text-caption text-black text-weight-normal q-mt-none">
                  {{$t('login.note_input_phone')}}
                </p>
                <q-separator class="q-my-lg" />
                <q-btn type="submit" 
                  class="btn-login shadow q-px-xl q-py-sm full-width radius-50 bg-gradient-yellow text-white text-capitalize" 
                  :disable="phone.length < 10"
                  :label="$t('button.send_otp')"
                />
              </form>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'LoginPage',
  components: {
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const phone = ref('')
    const accessToken = ref('')
    const cardno = ref('')
    const routerFrom = route.query.from

    // const decryptedStoreName = localStorage.getItem("storeName")
    // const decryptedOutlet = localStorage.getItem("outlet")
    // const decryptedNik = localStorage.getItem("nik")
    // const decryptedTableId = localStorage.getItem("table_id")
    // const decryptedUseAddress = localStorage.getItem("use_address")

    const onSubmit = async () => {
      $q.loading.show({
        message: 'Mengirim Kode Verifikasi. Silahkan Tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      accessToken.value = localStorage.getItem("tadaToken")

      await authRepo.checkMember('+62' + phone.value, accessToken.value).then((dataMember) => {
        try{
          if (dataMember.result[0].card !== 'undefined') {
            // localStorage.setItem('cardno', encrypt.encryptData(dataMember.result[0].card.no))
            // localStorage.setItem('program', encrypt.encryptData(dataMember.result[0].program.programId))
            localStorage.setItem('cardno', dataMember.result[0].card.no)
            localStorage.setItem('program', dataMember.result[0].program.programId)
          }
        } catch {
          $q.loading.hide()
          localStorage.removeItem('program')
          $q.notify({
            type: 'negative',
            message: 'Nomor Anda Belum Terdaftar Silahkan Mendaftar Terlebih Dahulu',
            position: 'top'
          })
          setTimeout(() => {
            router.push({path: '/register', query: { programId: dataMember.result[0].program.programId, phone: '+62' + phone.value, from: routerFrom }})
          }, 1000)
        }
      })

      // const decryptedCardno = localStorage.getItem("cardno")
      // cardno.value = encrypt.decryptData(decryptedCardno)
      cardno.value = localStorage.getItem("cardno")

      await authRepo.tadaOtp(accessToken.value, '+62' + phone.value, cardno.value).then((tadaOtp) => {
        try{
          if (cardno.value !== null) {
            $q.loading.hide()
            $q.notify({
              type: 'positive',
              message: 'Kode OTP Berhasil Dikirim',
              position: 'top'
            })
            router.push({path: '/verify', query: { phone: '+62' + phone.value, from: routerFrom }})
          }
        } catch (err) { 
          console.log(err)
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Kode Verifikasi Gagal Dikirim',
            position: 'top'
          })
        }
      })
    }

    const backToOnboarding = () => {
      if (routerFrom) {
        router.push(routerFrom)
      }
    }

    return {
      phone,
      onSubmit,
      backToOnboarding,
      isNumeric (value) {
        return /^\d+$/.test(value)
      },
    }
  }
})
</script>
