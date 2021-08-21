import Vue from "vue"

const baseDomain = 'https://netlify-functions-madebyfabian.netlify.app'

export const store = Vue.observable({
  functionsBaseUrl: baseDomain + '/.netlify/functions'
})