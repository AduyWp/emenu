<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-ma-none q-py-xl q-px-xl text-center">
          <p class="text-weight-bold text-h5">{{$t('intro.choose_title')}}</p>
          <div class="q-mt-xl grid choosing-container">
            <q-item class="q-pa-none block" tag="label">
              <q-item-section avatar class="q-ma-none q-pr-sm">
                <q-radio v-model="choosingEat" val="dinein" color="orange" />
              </q-item-section>
              <q-item-section class="q-ma-none">
                <q-item-label>
                  <img
                    src="~assets/intro/dine-in.png"
                    class="q-mr-sm full-width" 
                  >
                </q-item-label>
                <q-item-label class="text-weight-medium absolute-top">{{$t('intro.choose_dinein')}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none block" tag="label">
              <q-item-section avatar class="q-ma-none q-pr-sm">
                <q-radio v-model="choosingEat" val="takeaway" color="orange" />
              </q-item-section>
              <q-item-section class="q-ma-none">
                <q-item-label>
                  <img
                    src="~assets/intro/takeaway.png"
                    class="q-mr-sm full-width" 
                  >
                </q-item-label>
                <q-item-label class="text-weight-medium absolute-top">{{$t('intro.choose_takeaway')}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <q-footer class="footer-relative bg-white">
      <q-separator class="q-my-none" />
      <q-toolbar class="q-px-lg q-py-lg q-mb-none text-center bg-white">
        <div class="action full-width">
          <q-btn
            rounded
            outline
            color="black"
            size="md"
            class="text-capitalize q-py-sm q-px-md left back-button"
            :label="$t('button.back')"
            icon="chevron_left"
            @click.prevent="goToOnboarding"
          />
          <q-btn
            rounded
            size="md"
            class="text-capitalize q-py-sm q-px-lg bg-gradient-yellow right"
            :label="$t('button.continue')"
            :disable="choosingEat === ''"
            @click.prevent="goToHomepage"
          />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const router = useRouter()
    const choosingEat = ref('')
    const route = useRoute()

    const decryptedStoreName = localStorage.getItem("storeName")
    const decryptedOutlet = localStorage.getItem("outlet")
    const decryptedNik = localStorage.getItem("nik")
    const decryptedTableId = localStorage.getItem("table_id")
    const decryptedUseAddress = localStorage.getItem("use_address")

    return {
      choosingEat,
      goToOnboarding () {
        if (route.query.from === 'membership') {
          router.push({path: '/user/membership'})
        } else {
          // window.location.href = '/?storeName=' + encrypt.decryptData(decryptedStoreName) + '&nik=' + encrypt.decryptData(decryptedNik) + '&table_id=' + encrypt.decryptData(decryptedTableId) + '&outlet=' + encrypt.decryptData(decryptedOutlet) + '&use_address=' + encrypt.decryptData(decryptedUseAddress)
          window.location.href = '/?storeName=' + decryptedStoreName + '&nik=' + decryptedNik + '&table_id=' + decryptedTableId + '&outlet=' + decryptedOutlet + '&use_address=' + decryptedUseAddress
        }
      },
      goToHomepage () {
        if (choosingEat.value === 'dinein') {
          localStorage.setItem('dinein', JSON.stringify('1'));
        } else {
          localStorage.setItem('dinein', JSON.stringify('0'));
        }
        router.push({path: '/emenu/homepage'})
      }
    }
  }
})
</script>
