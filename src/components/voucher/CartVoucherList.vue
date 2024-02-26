<template>
  <div class="q-gutter-y-md q-mt-none">
    <q-card class="no-shadow q-mt-sm">
      <div class=" q-px-md flex justify-between">
        <p class="text-grey1 text-body2">{{$t('checkout.subtotalOrder')}}</p>
        <p class="text-red text-body2 text-weight-bold">{{rupiahFormat.format(subtotal)}}</p>
      </div>
      <div class="bg-grey-extralight q-pb-md q-mb-xl">
        <div class="q-pt-md q-px-sm">
          <div class="q-px-sm q-mb-lg">
            <h3 class="text-h6 q-ma-none text-black text-weight-bold">{{$t('voucher.forYou')}}</h3>
            <h3 class="text-body2 q-ma-none text-grey1 text-weight-normal q-mt-xs">{{$t('voucher.subForYou')}}</h3>
          </div>
          <div class="row" v-for="voucher in allVoucher" :key="voucher">
            <div class="col-12 col-sm-12 col-md-12 q-px-sm q-mb-md"
              v-if="voucher.Item.itemType === 'egift'"
            >
              <div
                v-ripple:blue
                class="relative-position text-weight-bold bg-white text-black card-menu text-center"
              >
                <q-card class="my-card q-pa-md radius-10">
                  <q-card-section class="q-px-none q-py-none">
                    <div class="row">
                      <div class="col-7 col-sm-7 col-md-7 q-pr-sm q-pl-none q-mb-none relative-position">
                        <p class="text-body1 text-weight-bold text-black line-clamp q-mb-none text-left line-clamp">{{voucher.Item.name}}</p>
                        <div class="absolute-bottom">
                          <p class="text-caption text-weight-bold text-red q-pt-xl q-mb-none text-left">{{ voucher.Item.Variants[0].pointProgram }} {{$t('voucher.point')}}</p>
                          <p v-if="myPoint === voucher.Item.Variants[0].pointProgram || myPoint >= voucher.Item.Variants[0].pointProgram" class="text-caption text-weight-normal text-grey1 q-mt-none q-mb-none text-left">{{ $t('voucher.havePoint') }}</p>
                          <p v-else class="text-caption text-weight-normal text-grey1 q-mt-none q-mb-none text-left">{{ $t('voucher.notPoint') }}</p>
                        </div>
                      </div>
                      <div class="col-5 col-sm-5 col-md-5 q-pl-sm q-pr-none q-mb-none">
                        <span v-if="voucher.Item.image !== null">
                          <q-img
                            no-spinner
                            :src="voucher.Item.image"
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
                        <q-btn
                          rounded
                          size="md"
                          class="text-capitalize q-py-sm q-px-md q-mt-md bg-red redeemPoint"
                          :label="$t('button.redeemPoint')"
                          :disable="myPoint < voucher.Item.Variants[0].pointProgram"
                          @click.prevent="redeemVoucher(voucher.Item.id, voucher.Item.Variants[0].pointProgram, voucher.Item.Variants[0].id)"
                        />
                        <q-dialog v-model="confirmRedeem" transition-show="scale" transition-hide="scale">
                          <q-card class="text-center radius-10">
                            <q-card-section>
                              <div class="text-body1 text-weight-bold">Tukar {{ pointVoucherRedeem }} Poinmu</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                              <div class="text-body2 text-black1">Apakah kamu yakin akan menukarkan poinmu?</div>
                            </q-card-section>

                            <q-card-actions class="bg-white text-teal flex justify-center items-center q-mb-md">
                              <q-btn label="Batal" class="text-capitalize q-ma-none bg-white text-white width-40-percent radius-50 text-black" v-close-popup />
                              <q-btn 
                                label="Ok" 
                                class="text-capitalize q-ma-none bg-red text-white width-40-percent radius-50 q-ma-none q-ml-md" 
                                @click.prevent="goToValidate(selectedVariant, idVoucher)" />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white q-px-md q-py-md text-center fixed-bottom">
        <q-btn
          rounded
          size="md"
          class="text-capitalize q-py-sm q-px-md q-mt-none bg-gradient-yellow redeemPoint full-width"
          :label="$t('voucher.myVoucher')"
          @click.prevent="goToMyVoucher"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs';
import VoucherRepository from 'repositories/voucher.repository'
const voucherRepo = new VoucherRepository()
import UserRepository from 'repositories/user.repository'
const userRepo = new UserRepository()
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const route = useRoute()
    const subtotal = route.query.subtotal
    const myPoint = ref()
    const page = ref(1)
    const allVoucher = ref()
    const userPoint = ref()
    // order Voucher
    const cardPin = ref('')
    const walletName = ref('')
    // modal redeem cofirmation
    const confirmRedeem = ref(false)
    const pointVoucherRedeem = ref('')
    const idVoucher = ref('')
    const selectedVariant = ref('')
    // validate redeem
    const phone = ref('')
    const accessToken = ref('')
    const cardno = ref('')

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      await voucherRepo.allVoucherList(page.value).then((voucherList) => {
        try {
          allVoucher.value = voucherList.result.data
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      await userRepo.cardDetail().then((data) => {
        try{
          myPoint.value = data.result.loyalty.wallet[0].balance
          walletName.value = data.result.loyalty.wallet[0].wallet
          cardPin.value = data.result.card.pin
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

    const redeemVoucher = (id, pointVoucher, variant) => {
      confirmRedeem.value = true
      pointVoucherRedeem.value = pointVoucher
      idVoucher.value = id
      selectedVariant.value = variant
    }

    onMounted(async () => {
      await fetchData()
    })

    const goToValidate = async (selectedVariant, itemId) => {
      $q.loading.show({
        message: 'Sedang Mengirim Kode OTP. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      accessToken.value = localStorage.getItem("tadaToken")
      // const decryptedCardno = localStorage.getItem("cardno")
      // cardno.value = encrypt.decryptData(decryptedCardno)
      cardno.value = localStorage.getItem("cardno")
      // const decryptedPhone = localStorage.getItem("phone")
      // phone.value = encrypt.decryptData(decryptedPhone)
      phone.value = localStorage.getItem("phone")
      
      await authRepo.tadaOtp(accessToken.value, phone.value, cardno.value).then((tadaOtp) => {
        try{
          if (cardno.value !== null) {
            $q.loading.hide()
            $q.notify({
              type: 'positive',
              message: 'Kode OTP Berhasil Dikirim',
              position: 'top'
            })
            router.push({path: '/emenu/voucher/redeem/validate', query: { variant: selectedVariant, itemId: itemId, walletName: walletName.value, cardPin: cardPin.value, pointVoucher: pointVoucherRedeem.value, from: 'cartPage', subtotal: subtotal }})
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

      $q.loading.hide()
    }

    return {
      rupiahFormat,
      allVoucher,
      rupiahFormat,
      myPoint,
      confirmRedeem,
      redeemVoucher,
      pointVoucherRedeem,
      goToValidate,
      subtotal,
      selectedVariant,
      idVoucher,
      goToMyVoucher () {
        router.push({path:'/emenu/cart/myVoucher', query: {subtotal: subtotal}})
      }
    }
  },
})
</script>
