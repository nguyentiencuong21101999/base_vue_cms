<template>
  <ul
    v-bind="$attrs"
    class="app-timeline"
    :aria-busy="loading ? 'true' : 'false'"
    v-on="$listeners"
  >
    <slot />
  </ul>
</template>

<script>
import { booleanProp } from '@/helpers/props'

export default {
  props: {
    loading: booleanProp('false'),
  },
}
</script>

<style lang="scss" scoped>
.app-timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  margin-left: 1rem;
  &[aria-busy='true'] {
    opacity: 0.55;
  }
}
</style>
