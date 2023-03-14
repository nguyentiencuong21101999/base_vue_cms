import { computed, ref, watch } from '@vue/composition-api'
// Notification
import { debounce } from 'debounce'

export default function useEmailSubscribeList() {
  // Use toast
  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'emailSubscribeId', label: 'Id' },
    { key: 'email', label: 'Email' },
    { key: 'host', label: 'Domain' },
    { key: 'createdDate', label: 'Created Date' },
    // { key: 'actions' },
  ]

  const perPage = ref(10)
  const totalEmailSubscribe = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref(null)
  const isSortDirDesc = ref(false)
  const sortBy = ref(null)
  const domainFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEmailSubscribe.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }

  watch([currentPage, domainFilter, perPage], () => {
    refetchData()
  })

  watch(
    [searchQuery],
    debounce(() => {
      totalEmailSubscribe.value = 0
      refetchData()
      // eslint-disable-next-line comma-dangle
    }, 700)
  )

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {
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
    domainFilter,
    currentPage,
  }
}
