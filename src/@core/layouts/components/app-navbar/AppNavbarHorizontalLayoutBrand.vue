<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img :src="appLogoImage" alt="logo" />
          </span>
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { $themeConfig } from '@themeConfig'
import { BImg, BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appLogoImage } = $themeConfig.app
    return {
      appLogoImage,
    }
  },
}
</script>

<style></style>
