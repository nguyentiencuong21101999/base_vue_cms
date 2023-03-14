<template>
  <div>
    <b-card>
      <!-- Alert: No item found -->
      <!-- <b-alert
          variant="danger"
          :show="!userData"
        >
          <h4 class="alert-heading">
            Error fetching user data
          </h4>
          <div class="alert-body">
            No user found with this user id. Check
            <b-link
              class="alert-link"
              :to="{ name: 'users-list' }"
            >
              User List
            </b-link>
            for other users.
          </div>
        </b-alert> -->

      <b-tabs pills>
        <!-- Tab: Email offer -->
        <b-tab active>
          <template #title>
            <feather-icon icon="EditIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Email Offer</span>
          </template>

          <EmailOffer class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Email Interview Invitation -->
        <b-tab>
          <template #title>
            <feather-icon icon="InboxIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Email Interview Invitation</span>
          </template>

          <EmailInvite class="mt-2 pt-75" />
        </b-tab>
        <!-- Tab:Email Thank-you Letter -->
        <b-tab>
          <template #title>
            <feather-icon icon="MessageSquareIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Email Thank-you Letter</span>
          </template>

          <EmailLetter class="mt-2 pt-75" />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { BCard, BTab, BTabs } from 'bootstrap-vue'
import EmailInvite from './EmailInvite.vue'
import EmailLetter from './EmailLetter.vue'
import EmailOffer from './EmailOffer.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    EmailOffer,
    EmailInvite,
    EmailLetter,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  async created() {},
  methods: {},
}
</script>
