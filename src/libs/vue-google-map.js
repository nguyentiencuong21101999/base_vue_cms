import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_PLACE_API_KEY || 'AIzaSyAOXGqNduW1ybK8f4i4BIe2IxHzic21-Xw',
    libraries: 'places',
    region: 'Australia',
    language: 'en',
  },
})
