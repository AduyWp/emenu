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
          <p class="text-body1 text-weight-bold text-black q-mb-none">{{$t('intro.choose_language')}}</p>
          <p class="text-body2 text-weight-normal text-grey q-mb-none q-mt-sm">{{$t('intro.language_like')}}</p>
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg q-pb-xl">
        <q-item class="col-12 q-px-lg q-py-md q-mb-md bordered items-center justify-between" tag="label" @click="onClick('id-ID')">
            <img 
              src="~assets/intro/icon/idn.png"
              width="30" 
              class="q-mr-sm" 
            />
            <q-item-label class="text-body2 text-weight-medium">{{$t('intro.idn_language')}}</q-item-label>
            <q-radio v-model="languageSelected" val="id-ID" color="green" />
        </q-item>
        <q-item class="col-12 q-px-lg q-py-md q-mb-md bordered items-center justify-between" tag="label" @click="onClick('en-US')">
            <img 
              src="~assets/intro/icon/eng.png"
              width="30" 
              class="q-mr-sm" 
            />
            <q-item-label class="text-body2 text-weight-medium">{{$t('intro.eng_language')}}</q-item-label>
            <q-radio v-model="languageSelected" val="en-US" color="green" />
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ConfigModel from 'models/config.model'
const config = new ConfigModel()

export default defineComponent({
  name: 'SelectLanguage',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const languageSelected = ref(locale.value)
    
    return {
      languageSelected,
      onClick (language) {
        locale.value = language
        config.show('language').then((data) => {
          // Update
          config.update('language', language)
        }).catch((e) => {
          // Store
          config.store('language', language)
        })
      }
    }
  }
})
</script>
