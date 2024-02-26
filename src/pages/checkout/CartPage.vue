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
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('checkout.cartTitle')}}</p>
            <p class="bg-red radius-50-percent text-white text-body1 flex items-center justify-center circle q-ml-sm q-mb-none">{{ totalItem }}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-px-md q-pt-md">
          <div class="flex full-width items-center justify-between">
            <p class="text-body1 text-weight-bold text-black">{{$t('checkout.myOrder')}}</p>
            <p class="text-body2 text-red" @click="cancelOrder = true">{{$t('checkout.cancelOrder')}}</p>
          </div>
        </div>
        <q-separator />
        <div class="q-px-md q-pt-md">
          <div class="flex full-width items-center justify-between">
            <p class="text-body2 text-weight-normal text-grey">{{$t('checkout.table_no')}}</p>
            <p class="text-body2 text-weight-bold text-black" @click="cancelOrder = true">{{tableNo}}</p>
          </div>
        </div>
        <q-separator />
        <!-- form -->
        <div class="q-px-md q-pt-md">
          <p class="text-body2 text-weight-bold text-black">{{$t('checkout.book_information')}}</p>
          <p class="text-body2 text-weight-normal text-black q-mb-sm">{{$t('form.name')}}<span class="text-red text-weight-bold">*</span></p>
          <q-input outlined v-model="name" class="q-mb-sm" 
            type="text"
            :rules="[
              val => !!val || $t('validation.required')
            ]"
            :placeholder="$t('form.placeholder_input_name')"
          />
        </div>
        <q-separator class="separator-section" />
        <!-- payment -->
        <div class="q-px-md q-py-md">
          <p class="text-body2 text-weight-bold text-black">{{$t('checkout.payment_method')}}</p>
          <div class="q-mt-sm grid-radio">
            <q-radio size="sm" v-model="payment" val="online" class="radio-payment">
              <q-item class="q-pa-none flex items-center" tag="label">
                <q-item-section class="q-ma-none flex items-center no-wrap flex-row">
                  <q-item-label>
                    <img
                      src="~assets/icon/online-payment.png"
                      class="q-mr-sm" 
                      width="24"
                      height="24" 
                    >
                  </q-item-label>
                  <q-item-label class="text-weight-medium">Online Payment</q-item-label>
                </q-item-section>
              </q-item>
            </q-radio>
            <q-radio size="sm" v-model="payment" val="cash" class="radio-payment">
              <q-item class="q-pa-none flex items-center" tag="label">
                <q-item-section class="q-ma-none flex items-center no-wrap flex-row">
                  <q-item-label>
                    <img
                      src="~assets/icon/cash.png"
                      class="q-mr-sm" 
                      width="24"
                      height="24" 
                    >
                  </q-item-label>
                  <q-item-label class="text-weight-medium">Bayar Dikasir</q-item-label>
                </q-item-section>
              </q-item>
            </q-radio>
          </div>
        </div>
        <!-- product -->
        <q-separator class="separator-section" />
        <div class="q-px-md q-pt-md q-pb-lg">
          <div v-for='(product, index) in itemData' :key='index'>
            <div class="row relative-position">
              <div class="col-1">
                <p class="text-body1 text-weight-bold bg-red text-white text-center radius-5 q-py-xs">x{{product.quantity}}</p>
              </div>
              <div class="text-left col-8 q-px-md">
                <p class="text-black text-weight-bold text-body2 q-mb-sm">{{product.name}}</p>
                <p class="text-grey1 text-body2 q-mb-sm" v-for="modifier in product.modifier" :key="modifier">{{modifier.name}}</p>
                <p class="text-grey1 text-body2 q-mb-sm">{{$t('checkout.note')}}: {{product.note}}</p>
                <p class="text-black text-body2 q-mb-sm">{{rupiahFormat.format(Number(product.price) * product.quantity)}}</p>
              </div>
              <div class="col-3 text-right">
                <div v-if="product.picture">
                  <img
                    class="radius-10"
                    :src="product.picture"
                    width="84"
                  >
                </div>
                <div v-else>
                  <q-img
                    no-spinner
                    src="~/assets/image-default.png"
                    style="height: 84px; max-width: 84px"
                    class="radius-10"
                  ></q-img>
                </div>
                <div class="q-mt-xs">
                  <!-- <q-icon class="text-green-light" name="edit" size="20px" />
                  <span class="q-ml-sm text-green-light text-body2">{{$t('checkout.edit')}}</span> -->
                  <q-icon class="text-black" name="delete_outline" size="20px" @click="removePopup(index)" />
                </div>
              </div>
            </div>
            <q-separator class="q-my-md" />
            <!-- dialog remove item -->
            <q-dialog v-model="remove" persistent>
              <q-card class="radius-10 modal-confirm">
                <q-card-section class="text-center q-px-xl q-py-lg">
                  <p class="text-body1 text-black text-weight-bold q-mb-sm">{{$t('popup.removeItemTitle')}}</p>
                  <p class="text-body2 text-black q-mb-none">{{$t('popup.removeItemSubTitle')}}</p>
                </q-card-section>
                <q-separator />
                <q-card-actions class="row items-center justify-center q-py-lg">
                  <q-btn
                    rounded
                    outline
                    color="red"
                    class="text-capitalize q-py-sm q-px-xl left back-button"
                    :label="$t('popup.cancel')"
                    v-close-popup
                  />
                  <q-btn
                    rounded
                    class="text-capitalize q-py-sm q-px-xl bg-red right text-white"
                    :label="$t('popup.delete')"
                    v-close-popup
                    @click.prevent="removeItem(itemIndex)"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <!-- dialog cancel order -->
            <q-dialog v-model="cancelOrder" persistent>
              <q-card class="radius-10 modal-confirm">
                <q-card-section class="text-center q-px-xl q-py-lg">
                  <p class="text-body1 text-black text-weight-bold q-mb-sm">{{$t('popup.removeOrderTitle')}}</p>
                  <p class="text-body2 text-black q-mb-none">{{$t('popup.removeOrderSubTitle')}}</p>
                </q-card-section>
                <q-separator />
                <q-card-actions class="row items-center justify-center q-py-lg">
                  <q-btn
                    rounded
                    outline
                    color="red"
                    class="text-capitalize q-py-sm q-px-xl left back-button"
                    :label="$t('popup.cancelOrder')"
                    v-close-popup
                  />
                  <q-btn
                    rounded
                    class="text-capitalize q-py-sm q-px-xl bg-red right text-white"
                    :label="$t('popup.deleteOrder')"
                    @click="cancelOrderItem(product.id)"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
        <q-separator class="separator-section" />
        <!-- voucher -->
        <div class="q-px-md q-pt-md q-pb-lg" v-if="isLogin">
          <span v-if="voucherUse">
            <div class="row items-center">
              <div class="col-2">
                <q-img
                  no-spinner
                  src="~/assets/cart/voucher.png"
                ></q-img>
              </div>
              <div class="text-left col-8 q-px-md">
                <p class="text-body1 text-weight-bold q-mb-xs flex items-center">
                  <img src="~assets/icon/Content.png" class="q-mr-sm" height="20" width="20">
                  <span>Kamu Hemat {{rupiahFormat.format(amountUse)}}</span>
                </p>
                <p class="text-caption text-weight-normal q-mb-none">{{voucherUse.EgiftMaster.egiftName}}</p>
              </div>
              <div class="col-2 text-right" @click.prevent="goToCartMyVoucher">
                <p class="text-body2 text-weight-bold q-mb-none text-green-light">Ganti</p>
              </div>
            </div>
          </span>
          <span v-else>
            <div class="row items-center" @click.prevent="goToCartVoucher">
              <div class="col-2">
                <q-img
                  no-spinner
                  src="~/assets/cart/voucher.png"
                ></q-img>
              </div>
              <div class="text-left col-8 q-px-md">
                <p class="text-body1 text-weight-bold q-mb-xs">{{$t('checkout.useVoucher')}}</p>
                <p class="text-body2 text-weight-normal q-mb-none">{{$t('checkout.useVoucherSub')}}</p>
              </div>
              <div class="col-2 text-right">
                <q-icon class="text-black" name="chevron_right" size="34px" />
              </div>
            </div>
          </span>
        </div>
        <!-- calculate total -->
        <q-separator class="separator-section" v-if="isLogin" />
        <div class="q-px-md q-pt-lg q-pb-sm q-mb-none">
          <div class="flex items-center justify-between dash-border q-mb-md q-pb-sm">
            <div class="text-left">
              <p class="text-grey1 text-body2 q-mb-sm">{{$t('checkout.subtotal')}}</p>
              <p class="text-grey1 text-body2 q-mb-sm text-green-light text-weight-bold" v-if="amountUse">{{$t('checkout.discount')}}</p>
              <p class="text-grey1 text-body2 q-mb-sm" v-if="taxValue">{{$t('checkout.tax')}} {{ parseFloat(tax).toFixed(0) }}%</p>
            </div>
            <div class="text-right">
              <p class="text-grey1 text-body2 q-mb-sm">{{rupiahFormat.format(subtotal)}}</p>
              <p class="text-grey1 text-body2 q-mb-sm text-green-light text-weight-bold" v-if="amountUse">-{{rupiahFormat.format(amountUse)}}</p>
              <p class="text-grey1 text-body2 q-mb-sm" v-if="taxValue">{{rupiahFormat.format(taxValue)}}</p>
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
        <q-separator />
        <div class="q-px-md q-mb-md">
          <div class="flex items-center justify-between q-mt-md" v-if="payment === 'online'" @click.prevent="openPayment('bottom')">
            <div class="text-left">
              <p class="text-black text-weight-bold text-body2 q-mb-none">Pilih Metode Pembayaran</p>
            </div>
            <div class="text-right flex items-center">
              <img
                v-if="choosePayment === 'qris'"
                src="~assets/payment/qris.png"
                class="q-mr-sm" 
                width="50"
              >
              <img
                alt="icon back"
                src="~assets/icon/chevron-left.png"
                width="18"
                height="18"
              >
            </div>
          </div>
        </div>
      </q-page>

      <!-- dialog confirm order -->
      <q-dialog v-model="confirmOrder" persistent>
        <q-card class="radius-10 modal-confirm">
          <q-card-section class="text-center q-px-xl q-py-lg">
            <p class="text-body1 text-black text-weight-bold q-mb-sm">{{$t('popup.removeOrderConfirmTitle')}}</p>
            <p class="text-body2 text-black q-mb-none">{{$t('popup.removeOrderConfirmSubTitle')}}</p>
          </q-card-section>
          <q-separator />
          <q-card-actions class="block q-px-xl q-py-lg">
            <q-btn
              rounded
              outline
              color="red"
              class="text-capitalize q-py-sm q-px-xl left back-button full-width"
              :label="$t('popup.orderAgain')"
              @click="goToHomepage()"
            />
            <q-btn
              rounded
              class="text-capitalize q-py-sm q-px-xl bg-red right text-white full-width q-mt-sm"
              :label="$t('popup.confirmOrder')"
              @click="acceptOrder()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- payment popup -->
      <q-dialog v-model="paymentPopup" persistent :position="position" class="popup-wrapper">
        <q-card class="popup">
          <q-card-section class="header-card q-px-lg">
            <div class="flex justify-center mt-5">
              <div class="header-line"></div>
            </div>
            <div class="text-center text-body1 text-weight-bold q-mt-lg">
              Pilih metode pembayaran
            </div>
          </q-card-section>
          <q-card-section class="q-px-lg">
            <q-card class="my-card q-pa-md full-height q-mb-md no-shadow border radius-10">
              <q-card-section class="q-pa-none">
                <q-radio size="sm" v-model="choosePayment" val="qris" class="radio-choose-payment w-100">
                  <div class="q-mt-sm">
                    <img
                      src="~assets/payment/qris.png"
                      class="q-mr-sm" 
                      width="50"
                    >
                  </div>
                </q-radio>
              </q-card-section>
            </q-card>
            <div class="grid-button">
              <q-btn
                rounded
                size="md"
                class="add-cart text-capitalize no-shadow q-py-sm q-px-sm left bg-white border text-black1"
                :label="$t('button.cancel')"
                @click.prevent="closePayment()"
              />
              <q-btn
                rounded
                size="md"
                class="text-capitalize q-py-sm q-px-lg bg-gradient-yellow text-black1"
                :label="$t('button.choose')"
                @click.prevent="closePayment(choosePayment)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>

    <q-footer class="footer-relative bg-white cart">
      <q-toolbar class="q-px-lg q-py-md q-mb-none text-center bg-white">
        <div class="action full-width">
          <q-btn
            rounded
            size="md"
            icon="add"
            class="add-cart text-capitalize no-shadow q-py-sm q-px-sm left bg-green-extralight border-green-light text-green-light"
            :label="$t('button.order')"
            @click="goToHomepage()"
          />
          <q-btn
            rounded
            size="md"
            class="text-capitalize q-py-sm q-px-lg bg-gradient-yellow right text-brown"
            :label="$t('button.completeOrder')"
            @click="confirmOrderPopup()"
          />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import AuthModel from 'models/auth.model'
const auth = new AuthModel()
import PaymentRepository from 'repositories/payment.repository'
const paymentRepo = new PaymentRepository()
import OrderRepository from 'repositories/order.repository'
const orderRepo = new OrderRepository()

export default defineComponent({
  name: 'ProductDetailPage',
  components: {
  },
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const note = ref('')
    const isLogin = ref()
    const quantity = ref(0)
    const total = ref('')
    const subtotal = ref('')
    const remove = ref(false)
    const cancelOrder = ref(false)
    const confirmOrder = ref(false)
    const paymentPopup = ref(false)
    const position = ref('')
    const itemData = ref([])
    const itemIndex = ref()
    const totalItem = ref(0)
    const tax = ref('')
    const tableNo = ref('')
    const taxValue = ref('')
    const name = ref('')
    // get outlet data
    const dataOutlet = ref({})
    // voucher
    const voucherUse = ref()
    const amountUse = ref('')
    const discountValue = ref('')
    const subtotalUseVoucher = ref('')
    const taxUseVoucer = ref('')
    // payment
    const payment = ref('')
    const choosePayment = ref('')
    const validTime = ref('10000')
    // order
    const paymentType = ref(0)
    const totalWithoutDiscount = ref('')

    // const decryptedtax = localStorage.getItem('tax')
    // tax.value = encrypt.decryptData(decryptedtax)
    tax.value = localStorage.getItem('tax')

    // const decryptedTable = localStorage.getItem('tableName')
    // tableNo.value = encrypt.decryptData(decryptedTable)
    tableNo.value = localStorage.getItem('tableName')

    const fetchData = async () => {
      try{
        const outlet = await config.show('outletData')
        dataOutlet.value = outlet.value

        config.show('voucher').then((data) => {
          voucherUse.value = data.value.result
        })
        
        const data = await config.show('addToCart')
        itemData.value = data.value
        subtotal.value = 0;
        subtotalUseVoucher.value = 0;

        for (var i = 0; i < itemData.value.length; i++) {
          totalItem.value += Number(itemData.value[i].quantity)
          subtotal.value += Number(itemData.value[i].price)
        }
        taxValue.value = Number(subtotal.value) * Number(tax.value) / 100
        total.value = Number(subtotal.value) + Number(taxValue.value)
        totalWithoutDiscount.value = subtotal.value
      } catch (e) {
        console.log(e)
      }

      if (auth.isLogin()) {
        const user = await auth.isLogin()
        isLogin.value = user.value
        name.value = isLogin.value.user.name
      }

      // calculate discount voucher
      if (voucherUse.value) {
        if (voucherUse.value.EgiftMaster.egiftType === 'value') {
          amountUse.value = voucherUse.value.EgiftMaster.amount
        } else if (voucherUse.value.EgiftMaster.egiftType === 'percentageDiscount') {
          discountValue.value += Number(subtotal.value) * Number(voucherUse.value.EgiftMaster.amount) / 100
          amountUse.value = discountValue.value
        } else if (voucherUse.value.EgiftMaster.egiftType === 'freeItem') {
          
        }
      }

      // tax
      if (dataOutlet.value.tax_service.tax_type == 0) {
        if (voucherUse.value) {
          taxUseVoucer.value += Number(subtotal.value) - (amountUse.value)
          taxValue.value += Number(taxUseVoucer.value) * Number(tax.value) / 100
          total.value = Number(taxUseVoucer.value) + Number(taxValue.value)
        } else {
          taxValue.value += Number(subtotal.value) * Number(tax.value) / 100
          total.value = Number(subtotal.value) + Number(taxValue.value)
        }
      } else if (dataOutlet.value.tax_service.tax_type == 2) {
        if (voucherUse.value) {
          taxValue.value += Number(subtotal.value) * Number(tax.value) / 100
          total.value = Number(subtotal.value) + Number(taxValue.value) - Number(amountUse.value)
        } else {
          taxValue.value += Number(subtotal.value) * Number(tax.value) / 100
          total.value = Number(subtotal.value) + Number(taxValue.value)
        }
      } else {
        if (voucherUse.value) {
          total.value = Number(subtotal.value) - Number(amountUse.value) + Number(taxValue.value)
        } else {
          total.value = Number(subtotal.value) + Number(taxValue.value)
        }
      }
    }
    
    const removePopup = (item) => {
      remove.value = true
      itemIndex.value = item
    }

    const removeItem = async (item) => {
      // update data
      try{
        const data = await config.show('addToCart')
        let newItem = itemData.value.filter((el, idx) => {
          return idx != item
        })

        const update = await config.update('addToCart', JSON.parse(JSON.stringify(newItem)))
        itemData.value = newItem

        // get subtotal
        subtotal.value = 0;
        totalItem.value = 0
        for (var i = 0; i < itemData.value.length; i++) {
          subtotal.value += Number(itemData.value[i].price)
          totalItem.value += Number(itemData.value[i].quantity)
        }
        taxValue.value = Number(subtotal.value) * Number(tax.value) / 100
        total.value = Number(subtotal.value) + Number(taxValue.value)
        totalWithoutDiscount.value = subtotal.value
        if (!newItem.length) {
          config.destroy('addToCart')
          window.location.href = '/emenu/homepage'
        }

      } catch (e) {
        console.log(e)
      }
    }

    const cancelOrderItem = (item) => {
      config.destroy('addToCart')
      config.destroy('voucher')
      window.location.href = '/emenu/homepage'
    }

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    })

    onMounted(async() => {
      await fetchData()
    })

    const confirmOrderPopup = async () => {
      if (isLogin.value) {
        confirmOrder.value = true
      } else {
        router.push({path:'/login', query: { from: '/emenu/cart'}})
      }
    }

    const acceptOrder = async () => {
      if (isLogin.value) {
        if (payment.value === 'cash') {
          await orderRepo.sendOrder(name.value, itemData.value, paymentType.value, taxValue.value, amountUse.value, total.value, totalWithoutDiscount.value).then((data) => {
            router.push({ path: '/emenu/checkout/success', query: {subtotal: subtotal.value, tax: tax.value, taxValue: taxValue.value, total: total.value, amountUse: amountUse.value, transactionId: data.transaction.id}})
          })
        } else {
          await paymentRepo.QRnobu(total.value, validTime.value).then((data) => {
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
        }
      } else {
        router.push({path:'/login', query: { from: '/emenu/cart'}})
      }
    }

    return {
      rupiahFormat,
      quantity,
      total,
      subtotal,
      remove,
      removePopup,
      cancelOrder,
      confirmOrder,
      confirmOrderPopup,
      acceptOrder,
      itemData,
      removeItem,
      cancelOrderItem,
      totalItem,
      itemIndex,
      tax,
      tableNo,
      taxValue,
      isLogin,
      voucherUse,
      amountUse,
      name,
      payment,
      paymentPopup,
      position,
      choosePayment,
      goToCartVoucher () {
        router.push({path:'/emenu/cart/voucher', query: {subtotal: subtotal.value}})
      },
      goToCartMyVoucher () {
        router.push({path:'/emenu/cart/myVoucher', query: {subtotal: subtotal.value, from: 'cart'}})
      },
      goToHomepage () {
        router.push({path:'/emenu/homepage'})
      },
      openPayment (pos) {
        position.value = pos
        paymentPopup.value = true
      },
      closePayment () {
        paymentPopup.value = false
      },
    }
  },
})
</script>
