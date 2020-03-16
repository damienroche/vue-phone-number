import Vue from 'vue'
import CustomPhoneNumberInput from './CustomPhoneNumberInput'

const plugin = {
  install(Vue) {
    Vue.component('custom-phone-number', CustomPhoneNumberInput)
  }
}

export default plugin