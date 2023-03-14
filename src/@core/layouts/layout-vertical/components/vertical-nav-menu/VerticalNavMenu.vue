<template>
  <div class="main-menu menu-fixed menu-accordion menu-shadow menu-dark">
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot name="header" :collapseTogglerIcon="collapseTogglerIcon">
        <ul class="nav navbar-nav flex-row">
          <!-- Logo & Text -->
          <li class="nav-item mx-auto">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <b-img :src="appLogoImage" alt="logo" style="width: 130px; object-fit: contain" />
              </span>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon icon="XIcon" size="20" class="d-block d-xl-none" @click="toggleVerticalMenuActive" />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

    <!-- main menu content-->
    <VuePerfectScrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="
        evt => {
          shallShadowBottom = evt.srcElement.scrollTop > 0
        }
      "
    >
      <VerticalNavMenuItems :items="navMenuItems" class="navigation navigation-main" />
    </VuePerfectScrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from '@/navigation'
import useAppConfig from '@core/app-config/useAppConfig'
import { $themeConfig } from '@themeConfig'
import { provide, ref } from '@vue/composition-api'
import { BImg, BLink } from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import useVerticalNavMenu from './useVerticalNavMenu'

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { isMouseHovered, collapseTogglerIcon, updateMouseHovered } = useVerticalNavMenu(props)

    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    // App Name
    const { appLogoImage } = $themeConfig.app

    return {
      navMenuItems,
      perfectScrollbarSettings,
      collapseTogglerIcon,
      isMouseHovered,
      updateMouseHovered,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Logo
      appLogoImage,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/base/core/menu/menu-types/vertical-menu.scss';
</style>
