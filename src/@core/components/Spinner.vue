<template>
  <svg
    class="spinner"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      style="opacity: 0.25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      style="opacity: 0.75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
</template>

<script>
import { stringProp } from '@/helpers/props'

export default {
  props: {
    variant: stringProp('light'),
    size: stringProp(),
  },
  computed: {
    classes() {
      return {
        [`text-${this.variant}`]: true,
        [this.size]: !!this.size,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.spinner {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  &.small {
    width: 16px;
    height: 16px;
  }
  &.medium {
    width: 32px;
    height: 32px;
  }
  &.large {
    width: 64px;
    height: 64px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
