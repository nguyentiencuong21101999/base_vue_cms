<template>
  <b-form-group
    :label="label"
    :label-for="label.toLowerCase()"
  >
    <GmapAutocomplete
      id="addressAutocomplete"
      ref="address"
      class="form-control"
      :value="value"
      :tabindex="tabIndex"
      :options="options"
      :placeholder="placeholder"
      @place_changed="setPlace"
    />
  </b-form-group>
</template>

<script>
import { BFormGroup } from 'bootstrap-vue'
import { stringProp, booleanProp } from '@/helpers/props'

export default {
  components: {
    BFormGroup,
  },
  props: {
    isLabel: booleanProp(true),
    label: stringProp('Address'),
    variant: stringProp('subForm'),
    hasIcon: booleanProp(true),
    iconName: stringProp('home'),
    selectLocation: stringProp(),
    placeholder: stringProp('Auto Complete'),
    typeBase: stringProp('primary'),
    value: stringProp(''),
    tabIndex: stringProp(''),
  },
  data() {
    return {
      val: '',
      googleAddress: {
        city: '',
        postCode: '',
        streetName: '',
        streetType: '',
        streetNumber: '',
        homeUnitNumber: '',
        state: '',
        address: '',
      },
      options: {
        componentRestrictions: { country: 'au' },
      },
    }
  },
  watch: {
    value(val) {
      this.val = val
      const inputValue = document.querySelector('#addressAutocomplete')
      inputValue.value = val
    },
  },
  methods: {
    setPlace(val) {
      this.resetData()
      if (!val.address_components) {
        this.$emit('input', this.googleAddress)
        return
      }
      const inputValue = document.querySelector('#addressAutocomplete')
      this.val = inputValue.value
      this.googleAddress.address = inputValue.value
      val.address_components.forEach(item => {
        switch (item.types[0]) {
          case 'administrative_area_level_1':
            this.googleAddress.state = item.short_name || ''
            break
          case 'locality':
            this.googleAddress.city = item.long_name || ''
            break
          case 'political':
            this.googleAddress.city = item.long_name || ''
            break
          case 'street_number':
            this.googleAddress.streetNumber = item.long_name || ''
            break
          case 'subpremise':
            this.googleAddress.homeUnitNumber = item.short_name || ''
            break
          case 'postal_code':
            this.googleAddress.postCode = item.long_name || ''
            break
          case 'route': {
            const street = item.short_name.split(' ')
            this.googleAddress.streetType = street[street.length - 1]
            this.googleAddress.streetName = item.short_name.replace(street[street.length - 1], '').trim()
            break
          }

          default:
            break
        }
      })
      this.$emit('input', { ...this.googleAddress })
    },

    resetData() {
      this.googleAddress = {
        city: '',
        postCode: '',
        streetName: '',
        streetType: '',
        streetNumber: '',
        homeUnitNumber: '',
        state: '',
        address: '',
      }
    },
  },
}
</script>
