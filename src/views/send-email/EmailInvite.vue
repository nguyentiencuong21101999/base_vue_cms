<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Header: Personal Info -->
        <div class="d-flex my-2">
          <h4 class="mb-0">Interview Invitation</h4>
        </div>

        <validation-observer ref="infoUserForm" #default="{ invalid }">
          <!-- Form: Personal Info Form -->
          <b-form class="mt-1">
            <b-row>
              <!-- Field: Email -->
              <b-col cols="12" md="5">
                <b-form-group label="To :" label-for="to">
                  <validation-provider #default="{ errors }" name="To" vid="to" rules="required|email">
                    <b-form-input id="to" v-model="dataObj.to" />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="5">
                <b-form-group label="Subject :" label-for="subject">
                  <validation-provider #default="{ errors }" name="Subject" vid="subject" rules="required">
                    <b-form-input id="subject" v-model="dataObj.subject" />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Field: cc -->
            <b-row>
              <b-col cols="12" md="5">
                <b-form-group label="Cc:" label-for="title" label-class="mb-1">
                  <validation-provider name="title" vid="Title">
                    <b-form-tags v-model="dataObj.ccs" tag-variant="primary" tag-pills tag-remove placeholder=""
                      add-button-text="Add" @input="handleChangeEmail"  />
                      <small class="text-danger">{{ handleShowErr("cc") }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <div>
              </div>
            </b-row>
            <!-- Field: title -->
            <b-row>
              <b-col cols="12" md="5" lg="4">
                <b-form-group label="Title" label-for="titles" label-class="mb-1">
                  <validation-provider name="title" vid="Title">
                    <b-form-radio-group id="titles" v-model="dataObj.title" :options="titleOptions" />
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Field: first name -->
            <b-row>
              <b-col cols="12" md="5">
                <b-form-group label="First Name" label-for="firstName">
                  <validation-provider #default="{ errors }" name="firstName" vid="firstName" rules="required">
                    <b-form-input id="firstName" v-model="dataObj.firstName" />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Field: Last Name -->
            <b-row>
              <b-col cols="12" md="5">
                <b-form-group label="Last Name" label-for="lastName">
                  <validation-provider #default="{ errors }" name="lastName" vid="lastName" rules="required">
                    <b-form-input id="lastName" v-model="dataObj.lastName" />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Field: Position -->
            <b-row>
              <b-col cols="12" md="5">
                <b-form-group label="Position" label-for="position">
                  <validation-provider #default="{ errors }" name="Position" vid="position" rules="required">
                    <b-form-input id="name" v-model="dataObj.position" />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Field: start Date-->
            <b-row>
              <b-col cols="12" md="5">
                <b-form-group label="Date and Time :" label-for="date" rules="required">
                  <validation-provider name="Date and Time" vid="date">
                    <flat-pickr v-model="dataObj.datetime" class="form-control" :config="{  enableTime: true,
                                                                                      dateFormat: 'l,F j, Y-h:i K',
                                                                                      time_24hr: false,
                                                                                      altFormat: 'l,F j, Y h:i K',
                                                                                      altInput: true,
                                                                                      locale: English,}"
                       />
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col style="opacity: 0" cols="12" md="5">
                <validation-provider #default="{ errors }" name="" vid="" rules="required">
                  <b-form-input id="actualSalary" v-model="dataObj.datetime" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" class="mb-1 mb-sm-0 mr-1" :disabled="invalid || loading || err.cc.length > 0" @click="
                  e => {
                    handlePreview(e)
                  }
                ">
                  <!-- <Spinner v-if="createAccount.loading" /> -->
                  <template>Preview </template>
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </div>
    </b-card>
    <b-modal id="ac" ref="modal" title="Preview" centered cancel-variant="outline-secondary" @ok="handleSubmitModal">
      <Invite :data-obj="dataObj" />
      <template #modal-ok>
        <span>Send</span>
      </template>
    </b-modal>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { BButton, BCard, BCol, BForm, BFormGroup, BFormInput, BFormRadioGroup, BFormTags, BRow } from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// eslint-disable-next-line no-unused-vars
import { formatAmount, formatDateTimeInvite } from '@/helpers/untils'
import useToastHandler from '@/services/toastHandler'
import { email, required } from '@validations'
// eslint-disable-next-line import/no-extraneous-dependencies
import { English } from 'flatpickr/dist/l10n/vn.js'
import flatPickr from 'vue-flatpickr-component'
import { mapActions, mapState } from 'vuex'
import Invite from './template/Invite.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BButton,
    ValidationProvider,
    ValidationObserver,
    Invite,
    flatPickr,
    BFormTags,
  },
  data() {
    return {
      dataObj: {
        to: '',
        subject: '',
        title: 'Mr',
        firstName: '',
        lastName: '',
        position: '',
        datetime: '',
        cc: [],
      },
      email,
      required,
      err: {
        cc: [],
      },
      English,
    }
  },
  computed: {
    ...mapState({
      loading: s => s.emailSubscribe.sendMail.loading,
    }),
  },
  methods: {
    ...mapActions({
      asyncSendInviteMail: 'emailSubscribe/sendMail/sendInviteMail',
    }),
    async isValidBtnSendMail() {
      // eslint-disable-next-line no-return-await
      return await this.$refs.infoUserForm.validate()
    },
    handlePreview(e) {
      e.preventDefault()
      this.$refs.modal.show()
    },
    async handleSubmitModal() {
      const { date, time } = formatDateTimeInvite(this.dataObj.datetime)
      const payload = this.dataObj
      delete payload.datetime
      payload.date = date
      payload.time = time
      const res = await this.asyncSendInviteMail(payload)
      if (res) {
        this.showToastSuccess('Success', 'Send Email Successfully!')
      }
    },
    validateEmail(e) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isEmail = regex.test(e)
      if (isEmail) return
      const isExisted = this.err.cc.filter(i => i === e)
      if (isExisted.length === 0) {
        this.err.cc.push(e)
      }
    },
    handleChangeEmail(emails) {
      const errArr = []
      emails.forEach(e => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isEmail = regex.test(e)
        if (!isEmail) {
          errArr.push(e)
        }
      })
      this.err.cc = errArr
    },
    handleShowErr(field) {
      switch (field) {
        case 'cc':
          if (this.err.cc.length === 0) return
          return `Email ${this.err.cc.join(', ')} invalid.`

        default:
          break
      }
    },
  },
  setup() {
    const titleOptions = [
      { text: 'Mr', value: 'Mr' },
      { text: 'Ms', value: 'Ms' },
    ]
    const { showToastError, showToastSuccess } = useToastHandler()
    return {
      formatAmount,
      titleOptions,
      showToastError,
      showToastSuccess,
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
