<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="success-wrapper flex items-center justify-center">
        <div class="q-mt-none text-center">
          <div class="description q-mt-lg q-px-xl text-center">
            <p class="text-h5 text-weight-medium text-black q-mt-xs q-mb-lg">{{$t('success.reddem_voucher')}}</p>
          </div>

          <img
            no-spinner
            src="~assets/icon/success-redeem.png"
            width='168'
          />
          <div class="voucher-code q-mt-lg q-mb-none text-center q-px-md">
            <p class="text-body1 text-weight-medium text-red q-mb-xs">{{$t('success.voucher_point')}} {{pointVoucher}} {{$t('success.point')}}</p>
            <p class="text-body2 text-weight-normal text-black q-mb-none q-mt-none">{{$t('success.my_point')}} {{myPoint}} {{$t('success.point')}}</p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import UserRepository from 'repositories/user.repository'
const userRepo = new UserRepository()

export default defineComponent({
  name: 'VoucherSuccessRedeemPage',
  components: {
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const pointVoucher = ref(route.query.pointVoucher)
    const myPoint = ref()
    const fromCart = route.query.from
    const subtotal = route.query.subtotal

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      await userRepo.cardDetail().then((data) => {
        try{
          myPoint.value = data.result.loyalty.wallet[0].balance
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
    })

    setTimeout(() => {
      if (fromCart === "cartPage") {
        router.push({path: '/emenu/cart/myVoucher', query: {subtotal: subtotal}})
      } else if (fromCart === "membership") {
        router.push('/user/membership')
      } else {
        router.push('/emenu/voucher')
      }
    }, 5000)

    return {
      pointVoucher,
      myPoint,
    }
  }
})
</script>
