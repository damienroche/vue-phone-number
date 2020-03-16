import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import PhoneNumber from 'awesome-phonenumber'

@Component
export default class CustomPhoneNumberInput extends Vue {
  @Prop({ type: String }) value!: string
  @Prop({ type: String, required: true }) regionCode!: string
  @Prop({ type: Boolean, default: true }) autoParse!: boolean
  @Prop({ type: String, default: 'e164', validator: (val) => {
    return ['input', 'international', 'national', 'e164', 'rfc3966', 'significant'].indexOf(val) > -1
  } }) parseKey!: string

  phoneNumber = ''


  @Watch('value')
  updateValue(value: string) {
    this.phoneNumber = this.value
    this.$emit('input', value)
  }

  @Watch('phoneObject', { deep: true })
  update(obj: any) {
    if (obj.valid && this.autoParse) {
      this.$emit('input', obj.number[this.parseKey])
    }
  }

  @Watch('regionCode')
  updatePhoneNumber() {
    this.$emit('input', this.phoneNumber = '')
  }

  created() {
    this.phoneNumber = this.value
  }


  get instance() {
    return new PhoneNumber(this.phoneNumber, this.regionCode)
  }

  get phoneObject() {
    return this.instance.toJSON() 
  }

  render() {
    return this.$scopedSlots.default 
      ? this.$scopedSlots.default({
        phoneNumberObject: this.phoneObject,
        isValid: this.instance.isValid()
      })
      : null
  }
}