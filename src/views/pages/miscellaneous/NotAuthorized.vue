<template>
  <div class="misc-wrapper">
    <b-link
      :to="{ path: '/' }"
      class="brand-logo"
    >
      <WolfdenLogo />
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="d-flex flex-column w-100 text-center">
        <h2 class="mb-1">
          You are not authorized! 🔐
        </h2>
        <p class="mb-2">
          You don’t have permission to access this page. Go Home!!
        </p>

        <template v-if="userRole">
          <b-button
            variant="primary"
            class="mb-1 btn-sm-block mx-auto"
            @click="logout()"
          >
            Logout
          </b-button>
        </template>

        <template v-else>
          <b-button
            variant="primary"
            class="mb-1 btn-sm-block mx-auto"
            to="/"
          >
            Back to Home
          </b-button>
        </template>

        <b-img
          fluid
          src="@/assets/images/pages/not-authorized-dark.svg"
          alt="Not authorized page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BLink, BImg, BButton } from 'bootstrap-vue'
import WolfdenLogo from '@core/layouts/components/Logo.vue'
import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    BLink,
    BImg,
    BButton,
    WolfdenLogo,
  },
  computed: {
    ...mapState('auth', ['user']),
    userRole() {
      return this.user.role === 'user'
    },
  },
  methods: {
    ...mapActions('auth', ['purgeAuth']),

    logout() {
      this.purgeAuth()
      this.$ability.update(initialAbility)
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
