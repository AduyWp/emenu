<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md q-py-md bg-white">
        <q-toolbar-title class="flex items-center justify-center relative-position" @click.prevent="goToDetailMembership">
          <img
            alt="icon back"
            class="absolute-left back-button-absolute"
            src="~assets/icon/arrow-left-black.png"
            width="24"
            height="24"
          >
          <div class="row items-center">
            <p class="text-body1 text-black text-weight-bold q-my-none q-ml-sm">{{$t('membership.myProfile')}}</p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-gutter-y-md q-mt-none">
        <q-card class="no-shadow q-mt-sm">
          <div class="q-pb-lg">
            <div class="q-mt-sm q-px-none">
              <q-card class="my-card q-pa-md radius-10 no-shadow">
                <div class="q-mb-lg">
                  <p class="q-mb-sm text-body1 text-weight-bold">Nama</p>
                  <p class="q-mb-sm text-body2 text-weight-normal">{{membershipData.name}}</p>
                </div>
                <div class="q-mb-lg">
                  <p class="q-mb-sm text-body1 text-weight-bold">Phone</p>
                  <p class="q-mb-sm text-body2 text-weight-normal">{{membershipData.phone}}</p>
                </div>
                <div class="q-mb-lg">
                  <p class="q-mb-sm text-body1 text-weight-bold">Email</p>
                  <span v-if="membershipData.email">
                    <p class="q-mb-sm text-body2 text-weight-normal">{{membershipData.email}}</p>
                  </span>
                  <span v-else>
                    <p class="q-mb-sm text-body2 text-weight-normal">-</p>
                  </span>
                </div>
              </q-card>
            </div>
          </div>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import UserRepository from 'repositories/user.repository'
const userRepo = new UserRepository()

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const membershipData = ref('')

    const fetchData = async () => {
      $q.loading.show({
        message: 'Sedang mengambil data. Silahkan tunggu...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

       await userRepo.cardDetail().then((data) => {
        try{
          membershipData.value = data.result.user
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

    onMounted(async () => {
      await fetchData()
    })

    return {
      membershipData,
      goToDetailMembership () {
        router.push({path:'/user/membership'})
      }
    }
  },
})
</script>
