function parseLocaleNumber(stringNumber: string, locale = 'es-CL') {
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

export default parseLocaleNumber
