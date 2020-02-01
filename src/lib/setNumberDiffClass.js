const timerId = Symbol('Timer id')

const setNumberDiffClass = ({
  timeout = 2000,
  classUp = 'up',
  classDown = 'down',
} = {}) => (curr, prev, el) => {
  if (!curr || !prev) return

  const clearClass = () => el.classList.remove(classUp, classDown)

  clearClass()
  el.classList.add(curr > prev ? classUp : classDown)

  clearTimeout(el[timerId])
  // eslint-disable-next-line no-param-reassign
  el[timerId] = setTimeout(clearClass, timeout)
}

export default setNumberDiffClass
