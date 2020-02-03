const timerId = Symbol('Different timer id')

const useWatchDiff = ({
  timeout = 2000,
  classUp = 'up',
  classDown = 'down',
  compare = (a, b) => a > b,
} = {}) => (curr, prev, el) => {
  if (!curr || !prev) return

  const clearClass = () => el.classList.remove(classUp, classDown)

  clearClass()
  el.classList.add(compare(curr, prev) ? classUp : classDown)

  clearTimeout(el[timerId])
  // eslint-disable-next-line no-param-reassign
  el[timerId] = setTimeout(clearClass, timeout)
}

export default useWatchDiff
