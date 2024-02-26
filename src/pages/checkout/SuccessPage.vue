<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white shadow-1">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="goToHomepage">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('success.to_cahsier')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-px-md text-center q-mt-md">
          <img
            alt="icon cashier"
            src="~assets/icon/cashier.png"
            width="180"
            height="180"
          >
          <div class="q-mt-md">
            <p class="text-body1 text-black text-weight-bold q-mt-none q-mb-xs">{{$t('success.complete_payment')}}</p>
            <p class="text-body2 text-grey1 text-weight-normal q-my-none width-60">{{$t('success.complete_desc')}} {{tableNo}}</p>
          </div>
          <div class="q-mt-md q-mb-md flex items-center justify-center" @click="checkOrder()">
            <p class="text-body2 text-blue text-weight-bold q-my-none q-mr-xs">{{$t('success.check_again')}}</p>
            <img
              alt="chevron right"
              src="~assets/icon/chevron-right.png"
              width="16"
              height="16"
            >
          </div>
        </div>
        <q-separator class="separator-section" />
        <div class="q-px-md q-pt-lg q-pb-sm q-mb-none">
          <div class="flex items-center justify-between dash-border q-mb-md q-pb-sm">
            <div class="text-left">
              <p class="text-grey1 text-body2 q-mb-sm">{{$t('checkout.subtotal')}}</p>
              <p class="text-grey1 text-body2 q-mb-sm text-green-light text-weight-bold" v-if="amountUse">{{$t('checkout.discount')}}</p>
              <p class="text-grey1 text-body2 q-mb-sm">{{$t('checkout.tax')}} {{ parseFloat(tax).toFixed(0) }}%</p>
            </div>
            <div class="text-right">
              <p class="text-grey1 text-body2 q-mb-sm">{{rupiahFormat.format(subtotal)}}</p>
              <p class="text-grey1 text-body2 q-mb-sm text-green-light text-weight-bold" v-if="amountUse">-{{rupiahFormat.format(amountUse)}}</p>
              <p class="text-grey1 text-body2 q-mb-sm">{{rupiahFormat.format(taxValue)}}</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-left">
              <p class="text-black text-weight-bold text-body2 q-mb-sm">{{$t('checkout.total')}}</p>
            </div>
            <div class="text-right">
              <p class="text-black text-weight-bold text-body2 q-mb-sm">{{rupiahFormat.format(total)}}</p>
            </div>
          </div>
        </div>
        <q-separator class="separator-section" />
        <div class="q-px-md q-pt-md q-pb-sm q-mb-sm text-center">
          <p class="text-body2 text-black text-weight-normal q-my-none">{{$t('success.confirm_payment')}}</p>
          <q-btn
            rounded
            size="md"
            class="text-capitalize q-mt-md q-py-sm q-px-lg bg-gradient-yellow right w-100 text-brown"
            :label="$t('button.check_payment')"
            @click="checkOrder()"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import OrderRepository from 'repositories/order.repository'
const orderRepo = new OrderRepository()

export default defineComponent({
  name: 'CheckoutSuccessPage',
  components: {
  },
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const route = useRoute()
    const tableNo = ref('')
    const subtotal = route.query.subtotal
    const amountUse = route.query.amountUse
    const tax = route.query.tax
    const taxValue = route.query.taxValue
    const total = route.query.total
    const transactionId = route.query.transactionId

    config.destroy('voucher')
    config.destroy('addToCart')

    // const decryptedTable = localStorage.getItem('tableName')
    // tableNo.value = encrypt.decryptData(decryptedTable)
    tableNo.value = localStorage.getItem('tableName')

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    const checkOrder = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
      await orderRepo.getTransaction(transactionId).then((data) => {
        try{
          console.log(data)
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

    return {
      rupiahFormat,
      tableNo,
      subtotal,
      amountUse,
      tax,
      taxValue,
      total,
      checkOrder,
      goToHomepage () {
        router.push({path:'/emenu/homepage'})
      },
    }
  },
})
</script>
