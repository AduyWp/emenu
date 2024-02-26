<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="goToCartPage">
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
        <CartVoucherList />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CartVoucherList from 'components/voucher/CartVoucherList.vue'

export default defineComponent({
  name: 'Homepage',
  components: {
    CartVoucherList,
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    return {
      goToCartPage () {
        router.push({path: '/emenu/cart'})
      }
    }
  }
})
</script>
