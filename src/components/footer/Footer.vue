<template>
  <q-footer elevated class="footer-relative bg-white" v-if="totalItem >= '1'">
    <q-toolbar class="justify-between items-center q-pa-md">
      <div class="row items-center">
        <img
          alt="Icon bag"
          src="~assets/home/icon/frame-bag.png"
          width="34"
        >
        <p class="text-body2 q-pl-sm text-black q-mb-none text-weight-medium">{{ rupiahFormat.format(totalPrice) }}</p>
      </div>
      <div>
        <q-btn
          rounded
          size="md"
          class="text-capitalize q-py-sm q-px-lg bg-green-light"
          :disable="totalPrice === 0"
          @click.prevent="goToCart"
        >
          {{$t('button.my_order')}} ({{totalItem}})
        </q-btn>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import ConfigModel from 'models/config.model'
const config = new ConfigModel()
import { useQuasar } from 'quasar'
import { inject } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    
  },

  setup () {
    const router = useRouter()
    const totalPrice = ref(0)
    const itemData = ref([])
    const totalItem = ref()
    const $q = useQuasar()
    const bus = inject('bus')

    bus.on('cart-updated', async () => {
      await fetchData()
    })

    const fetchData = async () => {
      try{
        const data = await config.show('addToCart')
        itemData.value = data.value
        let price = 0;
        totalItem.value = 0
        for (var i = 0; i < itemData.value.length; i++) {
          totalItem.value += Number(itemData.value[i].quantity)
          // totalItem.value = itemData.value.length
          price += Number(itemData.value[i].price)
        }
        totalPrice.value = price
      } catch (e) {
        console.log(e)
      }
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

    return {
      rupiahFormat,
      totalPrice,
      itemData,
      totalItem,
      goToCart () {
        router.push('/emenu/cart')
      }
    }
  }
})
</script>
