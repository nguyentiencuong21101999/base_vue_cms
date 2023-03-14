<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="mt-2">
        <download-csv class="float-right" :data="exportData" name="download.csv">
          <b-button variant="outline-success" class="mr-2" @click="() => {}">Export CSV</b-button>
        </download-csv>
      </div>

      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Show</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>
          <b-col cols="12" md="4" class="mb-md-0 mb-2">
            <v-select v-model="domainFilter" :value="domainFilter" :options="domainOptions" class="mr-1" />
          </b-col>
          <!-- Search -->
          <b-col cols="12" md="4">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." />
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        :items="fetchEmailSubscribe"
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        responsive
        show-empty
        primary-key="id"
      >
        <template #empty>
          <div v-if="list.loading" class="text-center text-white my-2">
            <p>Loading... Please wait</p>
          </div>

          <div v-else-if="!list.loading && fetchEmailSubscribe.length === 0" class="text-center text-white my-2">
            No matching records found
          </div>
        </template>

        <!-- Column: Id -->
        <template #cell(emailSubscribeId)="{ item }">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ item.emailSubscribeId }}</span>
          </div>
        </template>

        <!-- Column: email -->
        <template #cell(Email)="{ item }">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ item.email }}</span>
          </div>
        </template>

        <!-- Column: host -->
        <template #cell(Host)="{ item }">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ item.host }}</span>
          </div>
        </template>

        <!-- Column: createdDate -->
        <template #cell(createdDate)="{ item }">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ formatCreatedDateEmailSub(item.createdDate) }}</span>
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">
              Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries
            </span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalEmailSubscribe"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import useToastHandler from '@/services/toastHandler'
// eslint-disable-next-line object-curly-newline
import { formatCreatedDateEmailSub } from '@/helpers/untils'
// eslint-disable-next-line object-curly-newline
import { BButton, BCard, BCol, BFormInput, BPagination, BRow, BTable, VBModal } from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapState } from 'vuex'
import useEmailSubscribeList from './useEmailSubscribeList'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    vSelect,
    BButton,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      exportData: [],
      domainOptions: [],
    }
  },
  computed: {
    ...mapState({
      list: s => s.emailSubscribe.list, // mapping folder  store
    }),
  },
  async created() {
    const emailList = await this.asyncGetAllListEmailSubscribe()
    this.exportData = emailList ?? []
    const domainList = await this.asyncGetDomainFilterList()

    this.domainFilter = {
      label: 'Domain',
      value: null,
    }
    if (domainList?.length > 0) {
      this.domainOptions = domainList.map(e => ({
        label: e.host,
        value: e.host,
      }))
    }
  },
  methods: {
    ...mapActions({
      asyncGetListEmailSubscribe: 'emailSubscribe/list/getListEmailSubscribeAsync',
      asyncGetAllListEmailSubscribe: 'emailSubscribe/list/getAllListEmailSubscribeAsync',
      asyncGetDomainFilterList: 'emailSubscribe/filter/getDomainFilterListAsync',
    }),

    async fetchEmailSubscribe() {
      const data = await this.asyncGetListEmailSubscribe({
        search: this.searchQuery,
        domain: this.domainFilter?.value,
        limit: this.perPage,
        page: this.currentPage,
      })

      if (!data && this.list.error) return this.showToastError(false, 'Error fetching email subscribe list')
      this.totalEmailSubscribe = this.list.totalPage

      return data
    },
  },
  setup() {
    const { showToastError, showToastSuccess } = useToastHandler()

    const {
      tableColumns,
      perPage,
      currentPage,
      totalEmailSubscribe,
      dataMeta,
      perPageOptions,
      isSortDirDesc,
      searchQuery,
      refUserListTable,
      sortBy,

      domainFilter,
    } = useEmailSubscribeList()

    return {
      // Sidebar
      tableColumns,
      perPage,
      currentPage,
      totalEmailSubscribe,
      dataMeta,
      perPageOptions,
      searchQuery,
      refUserListTable,
      isSortDirDesc,
      sortBy,

      // Extra Filters
      showToastError,
      showToastSuccess,

      formatCreatedDateEmailSub,
      domainFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.vs__selected {
  max-width: 100px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
