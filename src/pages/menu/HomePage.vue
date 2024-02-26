<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white no-shadow">
        <q-toolbar-title class="flex items-center justify-between relative-position">
          <div class="flex items-center" @click.prevent="goToChoosingPage">
            <img
              alt="icon back"
              src="~assets/icon/arrow-left-black.png"
              width="24"
              height="24"
            >
            <div class="row">
              <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm text-capitalize">{{$t('home.menu')}}</p>
            </div>
          </div>
          <div>
            <q-img
              no-spinner
              src="~/assets/icon/ticket-01.png"
              style="height: 20px; width: 20px"
              @click="goToVoucher"
            ></q-img>
            <q-img
              no-spinner
              src="~/assets/icon/file-06.png"
              style="height: 20px; width: 20px"
              class="q-ml-md"
              @click="goToTransaction"
            ></q-img>
            <q-img
              no-spinner
              src="~/assets/icon/user-edit.png"
              style="height: 20px; width: 20px"
              class="q-ml-md"
              @click="goToProfile"
            ></q-img>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-separator class="separator-line" />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-page>
        <ProductList />
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import Footer from 'components/footer/Footer.vue'
import ProductList from 'components/menu/ProductList.vue'
import CategoryPopup from 'components/category/CategoryPopup.vue'
import AuthModel from 'models/auth.model'
const auth = new AuthModel()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'Homepage',
  components: {
    ProductList,
    Footer,
  },
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const isLogin = ref()

    const fetchData = async () => {
      if (auth.isLogin()) {
        const user = await auth.isLogin()
        isLogin.value = user.value
      }
    }

    onMounted(async () => {
      await fetchData()
    })

    const goToProfile = () => {
      if (isLogin) {
        router.push({path:'/login', query: { from: '/emenu/homepage'}})
      } else {
        router.push('user/membership')
      }
    }

    const goToTransaction = () => {
      if (isLogin) {
        router.push({path:'/login', query: { from: '/emenu/homepage'}})
      } else {
        router.push('user/transactions')
      }
    }

    const goToVoucher = () => {
      if (isLogin) {
        router.push({path:'/login', query: { from: '/emenu/homepage'}})
      } else {
        router.push('user/membership/voucher')
      }
    }
    
    return {
      isLogin,
      goToProfile,
      goToTransaction,
      goToVoucher,
      goToChoosingPage () {
        router.push('/choosing')
      },
    }
  }
})
</script>
