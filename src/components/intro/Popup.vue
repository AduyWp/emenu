<template>
  <q-dialog class="popup-wrapper">
    <q-btn class="close-btn" flat v-close-popup round icon="close" />
    <q-card class="popup">
      <q-card-section class="header-card q-px-lg">
        <div class="flex justify-center mt-5">
          <div class="header-line"></div>
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <div class="description q-mt-sm text-center">
          <p class="text-body1 text-weight-bold text-black q-mb-none">{{$t('intro.member_label_popup')}}</p>
          <p class="text-body2 text-weight-normal text-grey q-mb-none q-mt-sm">{{$t('intro.member_sublabel_popup')}}</p>
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg q-pb-xl">
        <q-btn 
          outline 
          class="text-capitalize full-width member-button"
          size="lg"
          @click="goToChoosePage"
        >
          <img 
            src="~assets/intro/icon/not-member.png"
            width="30" 
            class="q-mr-sm" 
          />
          <p class="text-body2 text-weight-medium q-my-none">{{$t('intro.no_member')}}</p>
          <img 
            src="~assets/intro/icon/arrow-right.png"
            width="20" 
            class="q-mr-sm" 
          />
        </q-btn>
        <q-btn 
          outline 
          class="text-capitalize full-width member-button q-mt-md"
          size="lg"
          @click.prevent="goToLogin"
        >
          <img 
            src="~assets/intro/icon/member.png"
            width="30" 
            class="q-mr-sm" 
          />
          <p class="text-body2 text-weight-medium q-my-none">{{$t('intro.member')}}</p>
          <img 
            src="~assets/intro/icon/arrow-right.png"
            width="20" 
            class="q-mr-sm" 
          />
        </q-btn>
        <q-btn 
          outline 
          class="text-capitalize full-width member-button q-mt-md"
          size="lg"
          @click.prevent="goToLogin"
        >
          <img 
            src="~assets/intro/icon/member-register.png"
            width="30" 
            class="q-mr-sm" 
          />
          <p class="text-body2 text-weight-medium q-my-none">{{$t('intro.register_member')}}</p>
          <img 
            src="~assets/intro/icon/arrow-right.png"
            width="20" 
            class="q-mr-sm" 
          />
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Popup',
  setup () {
    const router = useRouter()

    return {
      goToLogin () {
        router.push({path: '/login'})
      },
      goToChoosePage () {
        router.push({path: '/choosing'})
      }
    }
  }
})
</script>
