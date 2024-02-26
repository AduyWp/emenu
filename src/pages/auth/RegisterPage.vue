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
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('register.header_title')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="login">
      <q-page class="setting-wrapper">
        <div class="q-px-md q-pt-xl">
          <form @submit.prevent="onSubmit">
            <div class="q-gutter-y-md column">
              <q-input outlined v-model="name" class="q-mb-sm" 
                :label="$t('form.name_label')" 
                type="text"
                :rules="[
                  val => !!val || $t('validation.required')
                ]"
                :placeholder="$t('form.placeholder_input_name')"
              />
              <q-input outlined v-model="phone" class="q-mb-sm q-mt-none"
                  :rules="[
                    val => !!val || $t('validation.required'),
                    val => val.length >= 10 || $t('validation.min_digit_length', {number: 10}),
                    val => isNumeric(val) || $t('validation.numeric'),
                  ]"
                  :placeholder="$t('form.placeholder_input_phone')"
                  disable
                  lazy-rules>
                </q-input>
              <q-input outlined v-model="email" :label="$t('form.email_label')" 
                type="email" 
                class="q-mb-sm  q-mt-none"
                :rules="[
                  val => !!val || $t('validation.required')
                ]"
                :placeholder="$t('form.placeholder_input_email')"
              />
            </div>
            <q-btn type="submit" 
              class="btn-login shadow q-px-xl q-py-sm full-width radius-50 bg-gradient-yellow text-white text-capitalize" 
              :disable="phone === '' || email === '' ||  name === '' "
              :label="$t('button.register')"
            />
          </form>
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
import AuthModel from 'models/auth.model'
const auth = new AuthModel()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'RegisterPage',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const name = ref('')
    const phone = ref(route.query.phone)
    const email = ref('')
    const accessToken = ref('')
    const programId = ref('')
    const invoice = ref('')
    const random = ref(Math.floor(Math.random() * 100))
    const phoneMember = ref('')
    const card_id = ref('')
    const routerFrom = route.query.from

    // const decryptedStoreName = localStorage.getItem("storeName")
    // const decryptedOutlet = localStorage.getItem("outlet")
    // const decryptedNik = localStorage.getItem("nik")
    // const decryptedTableId = localStorage.getItem("table_id")
    // const decryptedUseAddress = localStorage.getItem("use_address")
    
    const onSubmit = async () => {
      $q.loading.show({
        message: 'Sedang mendaftar jadi member. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      accessToken.value = localStorage.getItem("tadaToken")

      invoice.value = random.value
      programId.value = route.query.programId
      phoneMember.value = route.query.phone

      await authRepo.registerMember(accessToken.value, phone.value, invoice.value, programId.value).then((createMember) => {
        try{
          card_id.value = createMember.result.card.no
          // localStorage.setItem('cardno', encrypt.encryptData(createMember.result.card.no))
          // localStorage.setItem('program', encrypt.encryptData(route.query.programId))
          localStorage.setItem('cardno', createMember.result.card.no)
          localStorage.setItem('program', route.query.programId)
        } catch {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: createMember.message,
            position: 'top'
          })
        }
      })

      await authRepo.sendRegisterMember(accessToken.value, card_id.value, name.value, email.value).then((sendMember) => {
        try{
          auth.login(sendMember.result)
          $q.notify({
            type: 'positive',
            message: 'Berhasil Mendaftar Member',
            position: 'top'
          })
          setTimeout(() => {
            // localStorage.setItem('phone', encrypt.encryptData(phone.value))
            localStorage.setItem('phone', phone.value)
            // window.location.href = '/choosing?storeName=' + encrypt.decryptData(decryptedStoreName) + '&nik=' + encrypt.decryptData(decryptedNik) + '&table_id=' + encrypt.decryptData(decryptedTableId) + '&outlet=' + encrypt.decryptData(decryptedOutlet) + '&use_address=' + encrypt.decryptData(decryptedUseAddress)
            if (routerFrom) {
              router.push(routerFrom)
            } else {
              router.push({path: '/user/membership'})
            }
          }, 500)
        } catch {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: createMember.message,
            position: 'top'
          })
        }
      })

      $q.loading.hide()
    }

    const backToLogin = () => {
      if (routerFrom) {
        router.push({path: '/login', query: { from: routerFrom }})
      } else {
        router.push('/login')
      }
    }

    return {
      onSubmit,
      name,
      phone,
      email,
      route,
      backToLogin,
      isNumeric (value) {
        return /^\d+$/.test(value)
      },
    }
  }
})
</script>
