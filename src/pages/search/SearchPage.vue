<template>
  <q-layout view="lHh Lpr lFf">
    <ProductList />
    <Footer />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Footer from 'components/footer/Footer.vue' 
import ProductList from 'components/search/ProductList.vue'

export default defineComponent({
  name: 'Homepage',
  components: {
    ProductList,
    Footer
  },
  setup () {
    const router = useRouter()

    return {
     
    }
  }
})
</script>
