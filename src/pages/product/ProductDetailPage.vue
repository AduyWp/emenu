<template>
  <q-page class="relative-position">
    <div class="w-100">
      <span v-if="dataItem.url !== null">
        <img
          alt="background"
          :src="dataItem.url"
          class="background full-width"
          style="height: 363px;"
        >
      </span>
      <span v-else>
        <img
          alt="background"
          src="~/assets/image-default.png"
          class="background full-width"
          style="height: 363px;"
        >
      </span>
      <div class="absolute-left back-button-left flex items-center no-bottom bg-black opacity-45 radius-50 q-py-sm q-px-sm height-40 width-40">
      </div>
      <div class="absolute-left back-button-left flex items-center no-bottom radius-50 q-py-sm q-px-sm" @click.prevent="goBack">
        <img
          alt="Logo back"
          src="~assets/icon/arrow-left-white.png"
          width="24"
        >
      </div>
    </div>
    <div class="relative-position">
      <div class="content bg-white absolute full-width q-pt-lg">
        <div class="wrapper">
          <div class="text-left q-mx-md">
            <h4 class="text-body1 text-weight-medium text-black q-mb-none q-mt-none line-clamp">{{dataItem.name}}</h4>
            <p class="text-body2 text-weight-medium text-grey q-mt-sm q-mb-none">{{dataItem.description}}</p>
            <p class="text-body1 text-weight-medium text-red q-mt-sm">{{rupiahFormat.format(dataItem.price)}}</p>
          </div>
          <q-separator class="q-my-lg" />
          <span v-if="dataItem.variant.length">
            <div class="q-mt-md q-px-md q-mt-lg q-mb-lg">
              <p class="text-body2 text-weight-medium text-black q-mt-sm q-mb-none">{{$t('detailProduct.required')}}</p>
              <p class="text-body2 text-weight-medium q-mt-sm q-mb-none text-green-light">{{$t('detailProduct.requiredDesc')}}</p>
              <div class="q-mt-md">
                <q-item class="col-12 q-px-none q-py-none q-mb-none items-center text-left" tag="label" v-for="variant in dataItem.variant" :key="variant.id">
                  <q-radio v-model="requiredVariant" :val="variant.price" color="green" @click.prevent="selectVariant(variant)" />
                  <q-item-label class="text-body2 text-weight-medium flex items-center justify-between full-width">
                    <p class="q-mb-none">{{variant.name}}</p>
                    <span v-if="variant.price !== null">
                      <p class="q-mb-none">+{{rupiahFormat.format(variant.price)}}</p>
                    </span>
                  </q-item-label>
                </q-item>
              </div>
            </div>
            <q-separator class="separator-section q-my-lg" />
          </span>
          <span v-else>
            <div class="q-mt-md q-px-md q-mt-lg q-mb-lg">
              <p class="text-body2 text-weight-medium text-black q-mt-sm q-mb-none">{{$t('detailProduct.required')}}</p>
              <p class="text-body2 text-weight-medium q-mt-sm q-mb-none text-green-light">{{$t('detailProduct.requiredDesc')}}</p>
              <div class="q-mt-md">
                <q-item class="col-12 q-px-none q-py-none q-mb-none items-center text-left" tag="label">
                  <q-radio v-model="requiredVariant" :val="dataItem.price" color="green" @click.prevent="selectVariant(dataItem)" />
                  <q-item-label class="text-body2 text-weight-medium flex items-center justify-between full-width">
                    <p class="q-mb-none">{{dataItem.name}}</p>
                    <span v-if="dataItem.price !== null">
                      <p class="q-mb-none">+{{rupiahFormat.format(dataItem.price)}}</p>
                    </span>
                  </q-item-label>
                </q-item>
              </div>
            </div>
            <q-separator class="separator-section q-my-lg" />
          </span>

          <span v-if="dataItem.modifier.length">
            <div class="q-mt-md q-px-md q-mt-lg q-mb-lg">
              <p class="text-body2 text-weight-medium text-black q-mt-sm q-mb-none">{{$t('detailProduct.optional')}}</p>
              <p class="text-body2 text-weight-medium q-mt-sm q-mb-none text-grey1">{{$t('detailProduct.optionalDesc')}}</p>
              <div class="q-mt-md">
                <q-item class="col-12 q-px-none q-py-none q-mb-none items-center text-left" tag="label" v-for="modifier in dataItem.modifier" :key="modifier.id">
                  <q-checkbox v-model="optionalVariant" :val="modifier" color="green" />
                  <q-item-label class="text-body2 text-weight-medium flex items-center justify-between full-width">
                    <p class="q-mb-none">{{modifier.name}}</p>
                    <span v-if="modifier.price !== null">
                      <p class="q-mb-none">+{{rupiahFormat.format(modifier.price)}}</p>
                    </span>
                  </q-item-label>
                </q-item>
              </div>
            </div>
            <q-separator class="q-my-lg" />
          </span>
          <div class="q-px-md q-mt-lg q-mb-xl note-field">
            <q-input 
              color="white" 
              v-model="note" 
              :placeholder="$t('form.placeholder_input_note')"
              counter
              maxlength="150"
            >
              <template v-slot:prepend>
                <q-icon name="drive_file_rename_outline" size="22px" />
              </template>
            </q-input>
          </div>
          <q-separator class="q-my-lg" />
          <div class="action q-px-lg q-mb-lg q-mt-none text-center flex justify-between align-center quantity">
            <div class="flex justify-between items-center left">
              <q-btn
                round
                icon="remove"
                class="text-capitalize bg-grey-light q-mr-sm"
                @click="decrement"
                :disable="quantity === 1"
              />
              <q-input v-model="quantity" :val="quantity" disable />
              <q-btn
                round
                icon="add"
                class="text-capitalize no-border bg-grey-light q-ml-sm"
                @click="increment"
              />
            </div>
            <div class="flex justify-right items-center right">
              <q-btn
                rounded
                size="md"
                class="text-capitalize q-py-sm q-px-lg bg-red full-width text-white"
                @click.prevent="goTosuccess"
              >
              {{$t('button.add')}} {{rupiahFormat.format(total)}}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import { inject } from 'vue'

export default defineComponent({
  name: 'ProductDetailPage',
  components: {
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const requiredVariant = ref()
    const optionalVariant = ref([])
    const note = ref('')
    const quantity = ref(1)
    const total = ref()
    const dataItem = ref()
    const totalOptionalPrice = ref()
    // for data atc
    const selectVariantData = ref()
    const bus = inject('bus')
    const item = ref([])
    // package
    // const dataItemPackage = ref([])
    // const currentStep = route.query.currentStep
    // let nextStep = null

    // const decryptedDataItem  = localStorage.getItem('product')
    // dataItem.value = encrypt.decryptData(JSON.parse(decryptedDataItem))
    dataItem.value = JSON.parse(localStorage.getItem('product'))

    // if (localStorage.getItem('productPackage') !== null) {
    //   const decryptedDataItemPackage  = localStorage.getItem('productPackage')
    //   dataItemPackage.value = encrypt.decryptData(JSON.parse(decryptedDataItemPackage))

    //   if (currentStep < dataItemPackage.value.package_item.length - 1) {
    //     nextStep = parseInt(currentStep) + 1
    //   }
    // }

    const rupiahFormat = computed(() => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
    }) 

    const fetchData = () => {
      if (dataItem.value.variant.length !== 0) {
        requiredVariant.value = dataItem.value.variant[0].price
        selectVariantData.value = dataItem.value.variant[0]
        // localStorage.setItem('total', encrypt.encryptData(dataItem.value.variant[0].price))
        localStorage.setItem('total', dataItem.value.variant[0].price)
        // let subtotal = localStorage.getItem('total')
        // total.value = encrypt.decryptData(subtotal)
        total.value = localStorage.getItem('total')
      } else {
        requiredVariant.value = dataItem.value.price
        selectVariantData.value = dataItem.value
        // localStorage.setItem('total', encrypt.encryptData(dataItem.value.price))
        // let subtotal = localStorage.getItem('total')
        localStorage.setItem('total', dataItem.value.price)
        total.value = localStorage.getItem('total')
      }
    }

    const selectVariant = (variant) => {
      selectVariantData.value = variant
    }

    watchEffect(requiredVariant, (requiredVariantPrice) => {
      requiredVariant.value = requiredVariantPrice
    })

    watchEffect([optionalVariant], ([optionalVariantPrice]) => {
      optionalVariant.value = optionalVariantPrice
    })

    watchEffect([quantity], ([quantityItem]) => {
      optionalVariant.value = quantityItem
    })

    watchEffect(() => {
      totalOptionalPrice.value = 0;
      for (var i = 0; i < optionalVariant.value.length; i++) {
        totalOptionalPrice.value += Number(optionalVariant.value[i].price)
      }
      let totalPrice = parseFloat(totalOptionalPrice.value) + parseFloat(requiredVariant.value) * parseFloat(quantity.value)
      // localStorage.setItem('total', encrypt.encryptData(totalPrice))
      localStorage.setItem('total', totalPrice)

      return total.value = totalPrice
    })

    onMounted(async () => {
      await fetchData()
    })

    const goBack = () => {
      localStorage.removeItem('total')
      router.go(-1)
    }

    const goTosuccess = async () => {
      // if (nextStep) {
      //   window.location.href = '/emenu/productPackage/' + dataItemPackage.value.id + "?step=" + nextStep
      // } else {
      //   if (localStorage.getItem('productPackage') !== null) {
      //     console.log('masuk')
      //   } else {
      //     item.value.push({
      //       id: dataItem.value.id,
      //       variant: selectVariantData.value,
      //       modifier: optionalVariant.value,
      //       quantity: quantity.value,
      //       total: total.value,
      //       url: dataItem.value.url,
      //       note: note.value
      //     })
      //     config.show('addToCart').then((data) => {
      //       // Update
      //       for (var i = 0; i < data.value.length; i++) {
      //         item.value.push(data.value[i])
      //       }
      //       config.update('addToCart', JSON.parse(JSON.stringify(item.value)))
      //     }).catch((e) => {
      //       // Store
      //       config.store('addToCart', JSON.parse(JSON.stringify(item.value)))
      //     })
      //     window.location.href = '/successAtc?total=' + total.value 
      //   }
      // }
      item.value.push({
        id: dataItem.value.id,
        category_id: dataItem.value.category.id, 
        product_id: dataItem.value.id,
        picture: dataItem.value.url,
        sku: dataItem.value.sku,
        name: dataItem.value.name,
        note: note.value,
        recipe_id: dataItem.value.recipe_id,
        cost_price: dataItem.value.cost_price,
        price: dataItem.value.other_prices[0].price,
        price_cut: 0,
        price_id: dataItem.value.other_prices[0].id,
        quantity: quantity.value,
        tax: dataItem.value.tax,
        discount: 0,
        status: dataItem.value.status,
        modifier: optionalVariant.value,
        variant: selectVariantData.value,
        total: total.value,
      })
      config.show('addToCart').then((data) => {
        // Update
        for (var i = 0; i < data.value.length; i++) {
          item.value.push(data.value[i])
        }
        config.update('addToCart', JSON.parse(JSON.stringify(item.value)))
      }).catch((e) => {
        // Store
        config.store('addToCart', JSON.parse(JSON.stringify(item.value)))
      })
      // router.push({name: 'SuccessAtcPage', query: { total: total.value }})
      window.location.href = '/successAtc?total=' + total.value
    }

    return {
      dataItem,
      note,
      rupiahFormat,
      quantity,
      total,
      requiredVariant,
      optionalVariant,
      goBack,
      selectVariant,
      goTosuccess,
      increment () {
        quantity.value++;
      },
      decrement () {
        quantity.value--;
      },
    }
  },
})
</script>
