/**
 * @callback Callback
 * @param {Any} value - текущее значение аргумента
 * @param {Any} oldValue - предыдущее значение аргумента
 * @param {Element} el - элемент, на котором сработала директива
 * @param {VNode} vnode
 * @param {VNode} oldVnode
 */

/**
 * Директива отслеживает изменение значения и вызывает функцию,
 * переданную в качестве аргумента, с новым и старым значением
 *
 * @example
 * v-watch:[callback].immediate="value"
 *
 * @param {Callback} callback - функция, вызываемая при изменении значения
 * @param {boolean} [immediate] - немедленный вызов callback
 * @param {Any} value - значение, за которым нужно следить
 */
export default {
  beforeMount(el, binding, vnode, oldVnode) {
    if (binding.modifiers.immediate) {
      binding.arg(binding.value, binding.oldValue, el, vnode, oldVnode)
    }
  },

  beforeUpdate(el, binding, vnode, oldVnode) {
    if (binding.value !== binding.oldValue) {
      binding.arg(binding.value, binding.oldValue, el, vnode, oldVnode)
    }
  },
}
