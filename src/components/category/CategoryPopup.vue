<template>
  <q-dialog class="popup-wrapper">
    <q-card class="popup">
      <q-card-section class="header-card q-px-lg">
        <div class="flex justify-center mt-5">
          <div class="header-line"></div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-lg q-pb-xl">
        <q-card class="my-card q-pa-md full-height q-mb-md no-shadow border" @click.prevent="goToRecommendedList()">
          <q-card-section class="q-pa-none">
            <div class="flex justify-between flex-wrap items-center full-width">
              <div class="text-left">
                <q-img
                  no-spinner
                  src="~/assets/home/recommend.png"
                  class="radius-10"
                  style="height: 64px; width: 64px"
                ></q-img>
              </div>
              <div class="flex items-center">
                <q-img
                  no-spinner
                  src="~/assets/icon/objects.png"
                  style="height: 24px; width: 24px"
                ></q-img>
                <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none q-ml-sm text-left">{{$t('home.recomended')}}</p>
              </div>
              <div>
                <q-img
                  no-spinner
                  src="~/assets/icon/chevron-left.png"
                  style="height: 20px; width: 20px"
                ></q-img>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="grid-category">
          <!-- <div 
            class="q-mb-md reward-list" 
            v-for="category in listCategory" 
            :key="category"
            @click.prevent="goToCategoryProductList(category.name, category.id)"
          > -->
          <div 
            class="q-mb-md reward-list" 
            v-for="category in listCategory" 
            :key="category"
            @click="categoryClick(category.name)"
          >
            <div
              v-ripple:blue
              class="relative-position text-weight-bold bg-white full-height text-black card-menu text-center"
            >
              <q-card class="my-card q-pa-md full-height no-shadow border">
                <q-card-section class="q-pa-none">
                  <div class="flex justify-between flex-wrap">
                    <div class="text-left">
                      <span v-if="category.url !== null">
                        <q-img
                          no-spinner
                          :src="category.url"
                          class="radius-10"
                          style="height: 64px; width: 64px"
                        ></q-img>
                      </span>
                      <span v-else>
                        <q-img
                          no-spinner
                          class="radius-10"
                          src="~/assets/image-default.png"
                        ></q-img>
                      </span>
                      <p class="text-body2 text-weight-bold text-black line-clamp q-mb-none q-mt-sm text-left">{{category.name}}</p>
                    </div>
                    <!-- <div>
                      <p class="text-caption total-items text-weight-bold text-red q-my-none text-left bg-red-light radius-50 q-px-sm">5</p>
                    </div> -->
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none fixed-bottom">
        <q-btn
          size="md"
          class="text-capitalize q-py-sm q-px-lg bg-green-dark1 full-width"
          v-close-popup
        >
          <div class="row items-center no-wrap">
            <img
              alt="Icon book"
              src="~assets/home/icon/book-closed.png"
              width="18"
            >
            <div class="text-center q-ml-sm text-white">
              {{$t('button.close_category')}}
            </div>
          </div>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import image from 'assets/menu/image.png'
import MenuRepository from 'repositories/menu.repository'
const menuRepo = new MenuRepository()
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import { inject } from 'vue'

export default defineComponent({
  name: 'CategoryPopup',

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const listCategory = ref()
    const bus = inject('bus')
    
    const fetchData = async () => {
      const decryptedDataItemCategories = localStorage.getItem('categories');
      listCategory.value = JSON.parse(decryptedDataItemCategories)
    }

    onMounted(async () => {
      fetchData()
    })
    
    const categoryClick = (id) => {
      bus.emit('scrollView', id)
    }

    return {
      listCategory,
      categoryClick,
      goToCategoryProductList (name, id) {
        window.location.href = '/emenu/category/' + id + '?id=' + id + '&name=' + name
      },
      goToRecommendedList () {
        window.location.href = '/emenu/recomended'
      }
    }
  }
})
</script>
