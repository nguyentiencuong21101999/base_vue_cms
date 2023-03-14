<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">Admin</p>
      </div>

      <b-avatar
        size="40"
        :src="user.profileUrl"
        :text="avatarText(user.userName)"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <!-- <feather-icon v-if="!user.fullName" icon="UserIcon" size="22" /> -->
      </b-avatar>
    </template>
    <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { initialAbility } from '@/libs/acl/config'
import { avatarText } from '@core/utils/filter'
import { BAvatar, BDropdownItem, BNavItemDropdown } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      avatarText,
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['purgeAuth', 'setAuth']),

    logout() {
      this.purgeAuth()
      this.setAuth({ isLoggedIn: false, user: {} })
      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>
