<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="sideImg" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2"> Welcome to Email Subscribe! 👋 </b-card-title>
          <b-card-text class="mb-2"> Please sign-in to your account and start the adventure </b-card-text>

          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- Username -->
              <b-form-group label="Username" label-for="login-username">
                <validation-provider #default="{ errors }" name="Username" vid="username" rules="required">
                  <b-form-input
                    id="login-username"
                    v-model="username"
                    :state="errors.length > 0 ? false : null"
                    name="login-username"
                    placeholder="john"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                </div>
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- <validation-provider
                #default="{ errors }"
                ref="capcha"
                name="Recaptcha"
                vid="recaptcha"
                rules="required"
              >
                <vue-recaptcha
                  ref="recaptcha"
                  v-model="recaptcha"
                  sitekey="6LfZwy8fAAAAALnfAcTBH8QQNEivfUVYp9Layi2A"
                  @verify="recaptchaAsVerified"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider> -->

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block :disabled="invalid" class="mt-2">
                <template v-if="loading">
                  <Spinner variant="light" />
                </template>

                <template v-else> Sign in </template>
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { required } from '@validations'
import {
  BButton,
  BCardText,
  BCardTitle,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BImg,
  BInputGroup,
  BInputGroupAppend,
  BRow,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapState } from 'vuex'
// import { VueRecaptcha } from 'vue-recaptcha'
import useToastHandler from '@/services/toastHandler'
import Spinner from '@core/components/Spinner'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    // VueRecaptcha,
    Spinner,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      recaptcha: '',
      status: '',
      username: '',
      password: '',
      sideImg: require('@/assets/images/pages/e-logo-ac.png'),
      required,
    }
  },
  computed: {
    ...mapState('account/login', ['loading', 'error']),
    ...mapState('auth', ['ability']),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    ...mapActions({
      loginAsync: 'account/login/loginAsync',
    }),

    async login() {
      const valid = await this.$refs.loginForm.validate()
      if (!valid) return

      const res = await this.loginAsync({
        userName: this.username,
        password: this.password,
      })
      if (!res.isLoggedIn) {
        this.showToastError('Login Failed!')
        return
      }
      this.$ability.update(this.ability)
      this.$router.replace('/').then(() => {
        this.showToastSuccess('Login Successfully!')
      })
    },
  },
  setup() {
    const { showToastSuccess, showToastError } = useToastHandler()
    return { showToastSuccess, showToastError }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
