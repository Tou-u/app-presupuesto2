export const parseLocaleNumber = (stringNumber: string, locale = 'es-CL') => {
  const thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '')
  const decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '')

  return parseFloat(
    stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  )
}

export const formatAmount = (amount: number | undefined) => {
  if (amount)
    return Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(amount)
  else {
    return '$0'
  }
}

export const formatDate = (date: Date) => {
  return Intl.DateTimeFormat('es-CL', {
    dateStyle: 'medium'
  }).format(date)
}
