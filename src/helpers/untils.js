export const formatDateTimeAustralia = (value, options) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    ...options,
  }).format(new Date(value))
}

export const formatCreatedDateEmailSub = value => {
  if (!value) return value
  const dateFormat = { day: 'numeric', month: 'numeric', year: 'numeric' }
  const timeFormat = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const date = formatDateTimeAustralia(value, dateFormat)
  const time = formatDateTimeAustralia(value, timeFormat)
  return `${date} - ${time}`
}

export const formatAmount = amount => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(Number(amount))) return 0
  return Intl.NumberFormat('en-US').format(amount)
}

export const formatDateOffer = (dateOffer, format = '-') => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (!dateOffer) return null
  const dt = dateOffer.split(format)
  const dayMonth = `${dt[0]} ${monthNames[Number(dt[1].replace('0', '')) - 1]}`
  const year = dt[2]
  return {
    dayMonth,
    year,
  }
}

export const formatDateTimeInvite = dateTime => {
  if (!dateTime) return null
  const dateTimeArr = dateTime.split('-')
  return {
    date: dateTimeArr[0],
    time: dateTimeArr[1],
  }
}
