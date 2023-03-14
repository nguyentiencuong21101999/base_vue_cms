import Vue from 'vue'
import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
const localizedFormat = require('dayjs/plugin/localizedFormat')

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

Vue.filter('date', (date, type = 'DD MMM YYYY') => {
  if (!date) return
  return dayjs(date).format(type)
})
