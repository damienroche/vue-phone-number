<template lang="pug">
  #app
    custom-phone-number(v-model="phoneNumber" autoParse parseKey="international" :regionCode="regionCode")
      b-field(slot-scope="{ phoneNumberObject, isValid }" label="Phone Number" :type="isValid ? 'is-success': 'is-danger'" :message="phoneNumberErrors(phoneNumberObject, isValid)")
        div
          b-input(type="tel" v-model="phoneNumber")
          pre {{ phoneNumberObject }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomPhoneNumberInput from './components/CustomPhoneNumberInput'

@Component({
  components: {
    'custom-phone-number': CustomPhoneNumberInput
  }
})
export default class App extends Vue {
  phoneNumber = '0475423103'
  regionCode = 'FR'

  phoneNumberErrors(object: any, valid: boolean) {
    if (valid) return null
    switch(object.possibility) {
      case 'too-short':
        return 'Numéro trop court'
      case 'too-long':
        return 'Numéro trop long'
      default:
        return 'Numéro invalide'
    }
  }
}
</script>
