const cache = new Map()

const orderedProps = (obj) => Object.keys(obj)
  .sort()
  .map((k) => ([k, obj[k]]))

const getCacheId = (inputs = []) => JSON.stringify(
  inputs.map((input) => (typeof input === 'object' ? orderedProps(input) : input)),
)

const memoizeIntl = (constructor) => (...args) => {
  const cacheId = getCacheId(args)
  return cache.get(cacheId) ?? cache.set(cacheId, new constructor(...args).format).get(cacheId)
}

export default memoizeIntl
