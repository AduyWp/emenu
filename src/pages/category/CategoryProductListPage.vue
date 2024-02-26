<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click="goToHomepage">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center"> 
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{pageTitle}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <ProductList />
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProductList from 'components/category/ProductList.vue' 
import Footer from 'components/footer/Footer.vue' 

export default defineComponent({
  name: 'CategoryProductList',
  components: {
    ProductList,
    Footer
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const pageTitle = ref('')

    pageTitle.value = route.query.name

    return {
      pageTitle,
      goToHomepage () {
        router.push({path: '/emenu/homepage'})
      }
    }
  }
})
</script>
