<template>
  <div class="q-gutter-y-md q-mt-none">
    <q-card class="no-shadow q-mt-sm">
      <div class=" q-px-md flex justify-between">
        <p class="text-grey1 text-body2">{{$t('checkout.subtotalOrder')}}</p>
        <p class="text-red text-body2 text-weight-bold">{{rupiahFormat.format(subtotal)}}</p>
      </div>
      <div class="q-pb-lg">
        <div class="q-mt-sm q-px-none">
          <span v-if="listMyVoucher">
            <div class="row bg-grey-extralight" v-for="voucher in listMyVoucher" :key="voucher">
              <div class="col-12 col-sm-12 col-md-12 q-px-sm q-mb-md">
                <div
                  v-ripple:blue
                  class="relative-position text-weight-bold bg-white text-black card-menu text-center"
                >
                  <q-card class="my-card q-pa-md radius-10">
                    <q-card-section class="q-px-none q-py-none">
                      <div class="row">
                        <div class="col-7 col-sm-7 col-md-7 q-pr-sm q-pl-none q-mb-none">
                          <p class="text-body1 text-weight-bold text-black line-clamp q-mb-none text-left line-clamp">{{voucher.programName}}</p>
                          <p class="text-body2 text-weight-normal text-black1 q-mt-md q-mb-xl text-left line-clamp">{{ voucher.name }}</p>
                          <div class="absolute-bottom">
                            <p class="text-caption text-weight-normal text-grey1 q-pt-xl q-mb-none text-left">{{formatDate(voucher.expiredAt)}}</p>
                          </div>
                        </div>
                        <div class="col-5 col-sm-5 col-md-5 q-pl-sm q-pr-none q-mb-none relative-position">
                          <span v-if="voucher.imageUrl !== null">
                            <q-img
                              no-spinner
                              :src="voucher.imageUrl"
                              class="full-width"
                            ></q-img>
                          </span>
                          <span v-else>
                            <q-img
                              no-spinner
                              src="~/assets/image-default.png"
                              class="full-width"
                            ></q-img>
                          </span>
                          <span v-if="voucherUse === voucher.number">
                            <q-btn
                              rounded
                              size="md"
                              class="text-capitalize q-py-sm q-px-md q-mt-md bg-white text-red shadow-1 useVoucher"
                              :label="$t('button.cancelVoucher')"
                              @click.prevent="cancelVoucher(voucher.number)"
                            />
                          </span>
                          <span v-else>
                            <q-btn
                              rounded
                              size="md"
                              class="text-capitalize q-py-sm q-px-md q-mt-md bg-red shadow-1 useVoucher"
                              :label="$t('button.useVoucher')"
                              @click.prevent="useVoucher(voucher.number)"
                              :disable="subtotal < voucher.minTransaction"
                            />
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </span>
          <span v-else>
            <div class="text-center">
              <img
                no-spinner
                src="~assets/voucher/empty.png"
                width="128"
              />
              <h3 class="text-h6 q-ma-none q-mt-lg text-black text-weight-bold">{{$t('voucher.emptyVoucher')}}</h3>
              <h3 class="text-body2 q-ma-none text-grey1 text-weight-normal q-mt-sm">{{$t('voucher.subTextEmptyVoucher')}}</h3>
            </div>
          </span>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs';
import VoucherRepository from 'repositories/voucher.repository'
const voucherRepo = new VoucherRepository()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const subtotal = route.query.subtotal
    const listMyVoucher = ref()
    const voucherUse = ref()

    const formatDate = (date = new Date(), format = 'D MMMM, YYYY') => dayjs(date).format(format)

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      await voucherRepo.voucherList().then((data) => {
        try{
          listMyVoucher.value = data.result
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

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    watchEffect(() => {
      config.show('voucher').then((data) => {
        voucherUse.value = data.value.result.number
      })
    })

    const useVoucher = async (voucher) => {
      await voucherRepo.voucherDetail(voucher).then((voucherDetail) => {
        try{
          config.show('voucher').then((data) => {
            // Update
            config.update('voucher', voucherDetail)
          }).catch((e) => {
            // Store
            config.store('voucher', voucherDetail)
          })
          window.location.href = '/emenu/cart'
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })
    }

    const cancelVoucher = () => {
      config.destroy('voucher')
      window.location.href = '/emenu/cart'
    }

    return {
      rupiahFormat,
      subtotal,
      listMyVoucher,
      formatDate,
      useVoucher,
      cancelVoucher,
      voucherUse,
    }
  },
})
</script>
