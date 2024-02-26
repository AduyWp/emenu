<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md q-py-sm bg-white">
        <q-toolbar-title class="flex items-center justify-between">
          <div class="flex items-center no-bottom bg-white q-py-sm q-px-none">
            <p class="q-ma-none text-body1 text-weight-bold text-black">{{$t('membership.detailMembership')}}</p>
          </div>
          <div class="flex items-center no-bottom bg-white q-py-sm q-px-none">
            <p class="q-ma-none text-body1 text-weight-bold text-primary profile" @click.prevent="goToProfile">{{$t('membership.myProfile')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-px-md q-my-md">
          <q-card class="no-shadow bg-grey-dark q-pa-md">
            <!-- <div class="card-header flex items-center">
              <img src="~assets/icon/silver.png" width="25" height="25" />
              <p class="q-ma-none text-uppercase text-h6 text-white text-weight-bold q-ml-sm">silver</p>
            </div> -->
            <div class="bg-grey-verylight q-px-md q-py-sm text-center q-mt-md radius-5">
              <p class="text-body2 text-white q-ma-none">{{$t('membership.expired_membership')}} {{formatDate(expiredAt)}}</p>
            </div>
            <div class="bg-white q-px-md q-py-sm q-mt-sm radius-5">
              <div class="row">
                <div class="col-8 flex items-center">
                  <p class="text-h6 text-black q-ma-none text-weight-bold">{{myPoint}}</p>
                  <span class="text-body1 text-weight-normal q-ml-xs">{{$t('membership.point')}}</span>
                </div>
                <div class="col-4 flex items-center">
                  <p class="text-h6 text-black q-ma-none text-weight-bold">{{totalVoucher}}</p>
                  <span class="text-body1 text-weight-normal q-ml-xs">{{$t('membership.voucher')}}</span>
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="q-gutter-y-md q-mt-md membership">
          <q-card class="no-shadow">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab class="text-grey1 text-capitalize" name="used" :label="$t('membership.used')" />
              <q-tab class="text-grey1 text-capitalize" name="history" :label="$t('membership.history')" />
              <q-tab class="text-grey1 text-capitalize" name="voucher" :label="$t('membership.voucher')" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="used">
                <div class="q-mt-sm q-px-none">
                  <q-card class="my-card q-pa-lg mb-extra-large no-shadow radius-10">
                    <div v-if="listMyVoucherUsed.length">
                      <div v-for="voucher in listMyVoucherUsed" :key="voucher">
                        <div class="row">
                          <div class="col-7 col-sm-7 col-md-7 q-pr-md q-pl-none q-mb-none relative-position">
                            <p class="text-body1 text-weight-bold text-black line-clamp q-mb-none text-left line-clamp">{{voucher.name}}</p>
                            <p v-if="voucher.minTransaction" class="text-body2 text-weight-normal text-black1 q-mt-md q-mb-sm text-left line-clamp">{{$t('membership.minTransaction')}} {{voucher.minTransaction}} {{$t('membership.dine')}}</p>
                            <p v-else class="text-body2 text-weight-normal text-black1 q-mt-md q-mb-sm text-left line-clamp">{{$t('membership.not')}} {{$t('membership.minTransaction')}} {{$t('membership.dine')}}</p>
                            <div class="absolute-bottom">
                              <p class="text-caption text-weight-normal text-grey1 q-mt-none q-mb-none text-left">{{$t('membership.alreadyRedeem')}}</p>
                            </div>
                          </div>
                          <div class="col-5 col-sm-5 col-md-5 q-pr-none q-mb-none relative-position">
                            <span v-if="voucher.imageUrl !== null">
                              <q-img
                                no-spinner
                                :src="voucher.imageUrl"
                                class="full-width sold-opacity"
                              ></q-img>
                              <img
                                no-spinner
                                src="~assets/used.png"
                                class="absolute-center"
                                style="width: 150px"
                              >
                            </span>
                            <span v-else>
                              <q-img
                                no-spinner
                                src="~/assets/image-default.png"
                                style="height: 164px; width: 164px"
                                class="sold-opacity"
                              ></q-img>
                              <img
                                no-spinner
                                src="~assets/used.png"
                                class="absolute-center"
                                style="width: 150px"
                              >
                            </span>
                          </div>
                        </div>
                        <q-separator class="q-my-md" />
                      </div>
                    </div>
                    <div v-else>
                      <div class="column items-center justify-center">
                        <img src="~assets/voucher/empty.png" height="150" />
                        <div class="q-mt-md">
                          <p class="q-ma-none text-black text-weight-bold text-body1">{{ $t('membership.emptyUsedVoucher')}}</p>
                        </div>
                      </div>
                    </div> 
                  </q-card>
                </div>
                <div class="fixed-bottom bg-white q-px-lg q-py-lg border-top">
                  <q-btn
                    rounded
                    size="md"
                    class="text-capitalize text-white q-py-sm q-px-md bg-red full-width"
                    :label="$t('membership.startOrder')"
                    @click.prevent="goToStartOrder"
                  />
                  <q-btn
                    rounded
                    size="md"
                    class="text-capitalize text-red q-py-sm q-px-md q-mt-sm full-width myvoucher-outline"
                    :label="$t('membership.myVoucher')"
                    @click.prevent="GoToMyVoucher"
                  />
                </div>
              </q-tab-panel>
              <q-tab-panel name="history">
                <div class="q-px-none q-mb-xl">
                  <q-card class="q-pa-md no-shadow">
                    <div class="flex items-center justify-between">
                      <p class="text-grey1 text-body2 q-mt-none q-ma-none">23/02/2023 - 12.58</p>
                      <p class="text-black text-body2 q-ma-none q-ma-none">{{ $t('membership.order') }} #380344938</p>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="flex items-center justify-between">
                      <p class="text-black text-body2 q-ma-none text-weight-bold">Rp 253.909</p>
                      <p class="text-green-light text-body2 q-ma-none text-weight-medium">{{ $t('membership.point') }} +1.010</p>
                    </div>
                  </q-card>
                  <q-separator class="separator-section" />
                </div>
                <div class="fixed-bottom q-px-lg q-my-lg">
                  <q-btn
                    rounded
                    size="md"
                    class="text-capitalize text-white q-py-sm q-px-md bg-red full-width"
                    label="Mulai Order"
                    @click.prevent="goToStartOrder"
                  />
                </div>
              </q-tab-panel>
              <q-tab-panel name="voucher">
                <div class="q-mt-sm q-px-none q-mb-xl">
                  <div class="q-mt-sm q-px-none">
                    <q-card class="my-card q-pa-lg radius-10 mb-extra-large no-shadow">
                      <div v-if="allVoucher.length">
                        <div v-for="voucher in allVoucher" :key="voucher">
                          <div class="row">
                            <div class="col-7 col-sm-7 col-md-7 q-pr-md q-pl-none q-mb-none relative-position">
                              <p class="text-body1 text-weight-bold text-black line-clamp q-mb-none text-left line-clamp">{{voucher.Item.name}}</p>
                              <p v-if="voucher.Item.Variants[0].minPrice" class="text-body2 text-weight-normal text-black1 q-mt-md q-mb-sm text-left line-clamp">{{$t('membership.minTransaction')}} {{voucher.Item.Variants[0].minPrice}} {{$t('membership.dine')}}</p>
                              <p v-else class="text-body2 text-weight-normal text-black1 q-mt-md q-mb-sm text-left line-clamp">{{$t('membership.not')}} {{$t('membership.minTransaction')}} {{$t('membership.dine')}}</p>
                              <div class="absolute-bottom">
                                <p class="text-caption text-weight-bold text-red q-mb-none text-left">{{ voucher.Item.Variants[0].pointProgram }} {{$t('voucher.point')}}</p>
                                <p v-if="myPoint === voucher.Item.Variants[0].pointProgram || myPoint >= voucher.Item.Variants[0].pointProgram" class="text-caption text-weight-normal text-grey1 q-mt-none q-mb-none text-left">{{ $t('voucher.havePoint') }}</p>
                                <p v-else class="text-caption text-weight-normal text-grey1 q-mt-none q-mb-none text-left">{{ $t('voucher.notPoint') }}</p>
                              </div>
                            </div>
                            <div class="col-5 col-sm-5 col-md-5 q-pr-none q-mb-none relative-position">
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
                                  style="height: 164px; width: 164px"
                                ></q-img>
                              </span>
                              <q-btn
                                rounded
                                size="md"
                                class="text-capitalize text-white q-py-sm q-px-md bg-red full-width q-mt-md"
                                :label="$t('button.redeemPoint')"
                                @click.prevent="redeemVoucher(voucher.Item.id, voucher.Item.Variants[0].pointProgram, voucher.Item.Variants[0].id)"
                                :disable="myPoint < voucher.Item.Variants[0].pointProgram"
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
                          <q-separator class="q-my-md" />
                        </div>
                      </div>
                      <div v-else>
                        <div class="column items-center justify-center">
                          <img src="~assets/voucher/empty.png" height="150" />
                          <div class="q-mt-md">
                            <p class="q-ma-none text-black text-weight-bold text-body1">{{ $t('membership.emptyVoucher')}}</p>
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </div>
                </div>
                <div class="fixed-bottom bg-white q-px-lg q-py-lg border-top">
                  <q-btn
                    rounded
                    size="md"
                    class="text-capitalize text-white q-py-sm q-px-md bg-red full-width"
                    :label="$t('membership.startOrder')"
                    @click.prevent="goToStartOrder"
                  />
                  <q-btn
                    rounded
                    size="md"
                    class="text-capitalize text-red q-py-sm q-px-md q-mt-sm full-width myvoucher-outline"
                    :label="$t('membership.myVoucher')"
                    @click.prevent="GoToMyVoucher"
                  />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs';
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import UserRepository from 'repositories/user.repository'
const userRepo = new UserRepository()
import VoucherRepository from 'repositories/voucher.repository'
const voucherRepo = new VoucherRepository()
import AuthRepository from 'repositories/auth.repository'
const authRepo = new AuthRepository()

export default defineComponent({
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const tab = ref('history')
    const membershipData = ref('')
    const myPoint = ref('')
    const expiredAt = ref('')
    const totalVoucher = ref('')
    const allVoucher = ref([])
    const page = ref(1)
    const listMyVoucherUsed = ref([])
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

    const formatDate = (date = new Date(), format = 'D MMMM, YYYY') => dayjs(date).format(format)

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      await userRepo.cardDetail().then((data) => {
        try{
          membershipData.value = data.result
          expiredAt.value = data.result.card.expiredAt
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

      await voucherRepo.voucherList().then((data) => {
        try{
          totalVoucher.value = data.result.length
          for (var i = 0; i < data.result.length; i++) {
            if (data.result[i].status === 'used') {
              listMyVoucherUsed.value.push(data.result[i])
            }
          }
        } catch (err) {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: 'Gagal Mengambil Data',
            position: 'top'
          })
        }
      })

      await voucherRepo.allVoucherList(page.value).then((voucherList) => {
        try {
          for (var i = 0; i < voucherList.result.data.length; i++) {
            if (voucherList.result.data[i].Item.itemType === 'egift') {
              allVoucher.value.push(voucherList.result.data[i])
            }
          }
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

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    const goToValidate = async (selectedVariant, itemId) => {
      $q.loading.show({
        message: 'Sedang Mengirim Kode OTP. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

      // const decryptedAccessToken = localStorage.getItem("tadaToken")
      // accessToken.value = encrypt.decryptData(decryptedAccessToken)
      // const decryptedCardno = localStorage.getItem("cardno")
      // cardno.value = encrypt.decryptData(decryptedCardno)
      // const decryptedPhone = localStorage.getItem("phone")
      // phone.value = encrypt.decryptData(decryptedPhone)
      accessToken.value = localStorage.getItem("tadaToken")
      cardno.value = localStorage.getItem("cardno")
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
            router.push({path: '/emenu/voucher/redeem/validate', query: { variant: selectedVariant, itemId: itemId, walletName: walletName.value, cardPin: cardPin.value, pointVoucher: pointVoucherRedeem.value, from: 'membership' }})
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
      tab,
      membershipData,
      myPoint,
      totalVoucher,
      allVoucher,
      listMyVoucherUsed,
      formatDate,
      expiredAt,
      goToValidate,
      selectedVariant,
      idVoucher,
      redeemVoucher,
      confirmRedeem,
      pointVoucherRedeem,
      GoToMyVoucher () {
        router.push({path:'/user/membership/voucher'})
      },
      goToStartOrder () {
        router.push({path:'/choosing', query: {from: 'membership'}})
      },
      goToProfile () {
        router.push({path:'/user/membership/profile'})
      },
    }
  },
})
</script>
