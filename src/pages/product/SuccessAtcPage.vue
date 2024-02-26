<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="success-wrapper flex items-center justify-center">
        <div class="q-mt-none text-center">
          <img
            no-spinner
            src="~assets/icon/success-atc.png"
            width='64'
          />
          <div class="description q-mt-lg q-px-xl text-center">
            <p class="text-h5 text-weight-medium text-black q-mt-xs q-mb-lg">{{$t('success.add_menu')}}</p>
          </div>
          <div class="voucher-code q-my-none text-center q-px-md">
            <p class="text-caption text-weight-normal text-grey q-mb-lg">{{$t('success.add_total')}}</p>
            <p class="text-body1 text-weight-medium text-black q-mb-none q-my-sm">{{rupiahFormat.format(total)}}</p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SuccessAtcPage',
  components: {
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const total = route.query.total

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    }) 

    setTimeout(() => {
      window.location.href = '/emenu/homepage'
    }, 2000)

    return {
      total,
      rupiahFormat
    }
  }
})
</script>
