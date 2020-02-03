import memoizeIntl from '@/lib/memoizeIntl'

const useCurrency = ({
  locales = 'ru',
  options = {
    currency: 'RUB',
    currencyDisplay: 'symbol',
  },
} = {}) => memoizeIntl(
  Intl.NumberFormat,
)(
  locales,
  {
    ...options,
    style: 'currency',
  },
)

export default useCurrency
