<template>
  <div class="relative">
    <TextBase :class="stake" component="label" variant="7">
      {{ label }}
    </TextBase>
    <TextBase v-if="isFractional" class="fractional" component="label" variant="8"> {{ fractionalOld }}% </TextBase>
    <input
      v-model="internalValue"
      v-bind="$props"
      type="text"
      :class="classes"
      @blur="blurInput"
      @focus="isInputActive = true"
    />
  </div>
</template>
<script>
import { booleanProp, enumProps, stringProp } from '@/helpers/props'

export default {
  props: {
    label: stringProp('Stake'),
    symbol: stringProp('$'),
    value: { type: [Number, String], default: '' },
    typeInput: enumProps('primary', 'secondary'),
    readonly: booleanProp(),
    isFractional: booleanProp(),
    fractionalOld: { type: [Number, String], default: '' },
  },
  data() {
    return {
      isInputActive: false,
    }
  },
  computed: {
    classes() {
      return {
        [`stake-${this.typeInput}`]: true,
      }
    },
    stake() {
      return {
        [`stake-label-${this.typeInput}`]: true,
      }
    },
    internalValue: {
      get() {
        if (this.isInputActive) {
          if (this.value.toString() === '0') return ''
          else return this.value.toString()
        } else if (this.symbol === '$') {
          if (this.isFloat(this.value))
            return (
              '$' +
              this.value
                .toFixed(2)
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
            )
          else return '$' + this.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '.00'
        } else return this.value.toString() + this.symbol
      },
      set(modifiedValue) {
        let newValue = parseFloat(modifiedValue)
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.$emit('input', parseFloat(newValue.toFixed(2)))
      },
    },
  },
  methods: {
    blurInput() {
      let value = parseFloat(this.internalValue.replace('$', ''))
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('blur', value.toFixed(2))
      this.isInputActive = false
    },
    isFloat(n) {
      return Number(n) === n && n % 1 !== 0
    },
  },
}
</script>
<style lang="scss" scoped>
.stake-primary {
  @include input;
  @apply border-gray-primary;
  /* stylelint-disable-next-line */
  padding: 3px 16px 3px 26px;
  text-align: right;
  &:focus {
    border: 1px solid $color-gold;
  }
}
.stake-secondary {
  @include input;
  @apply text-white-100;
  @apply bg-white-100;
  /* stylelint-disable-next-line */
  background-color: transparent;
  padding: 9px 4px 9px 40px;

  &:focus {
    border: 1px solid $color-gold;
  }
}
.stake-label-primary {
  position: absolute;
  top: 5px;
  left: 6px;
  z-index: 1;
  @apply text-black-primary;
}
.stake-label-secondary {
  position: absolute;
  top: 5px;
  left: 6px;
  z-index: 1;
  @apply text-white-100;
}

.fractional {
  position: absolute;
  bottom: 5px;
  left: 6px;
  z-index: 1;
  text-decoration: line-through;
  @apply text-gray-450;
}
</style>
