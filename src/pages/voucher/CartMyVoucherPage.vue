<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="goToCartVoucher">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('voucher.title')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <MyVoucher />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MyVoucher from 'components/voucher/CartMyVoucherList.vue'

export default defineComponent({
  name: 'Homepage',
  components: {
    MyVoucher,
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const subtotal = route.query.subtotal
    const from = route.query.from

    return {
      goToCartVoucher () {
        if (from === 'cart') {
          router.push({path:'/emenu/cart'})
        } else {
          router.push({path:'/emenu/cart/voucher', query: {subtotal: subtotal}})
        }
      }
    }
  }
})
</script>
