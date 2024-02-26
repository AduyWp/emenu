<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click="goToHomepage">
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
        <VoucherList />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import VoucherList from 'components/voucher/VoucherList.vue'

export default defineComponent({
  name: 'Homepage',
  components: {
    VoucherList,
  },
  setup () {
    const router = useRouter()

    return {
      goToHomepage () {
        router.push({path:'/emenu/homepage'})
      }
    }
  }
})
</script>
