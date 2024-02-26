<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

const arraySort = []

function initMap(origin = null, destination = null, totalLength) {
  return new Promise((resolve, reject) => {
    if (origin && destination) {
      const request = {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: true
      };
      const service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(request).then((response) => {
        resolve(response)
      });
    } else {
      reject(new Error('Invalid data'))
    }
  })
}

window.initMap = initMap

export default defineComponent({
  name: 'App'
})
</script>
