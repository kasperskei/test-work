import { reactive, readonly } from 'vue'
import * as api from '@/api'

const state = reactive({
  groupList: [],
  productList: [],
  cartProductMap: {},
  rateUsdInRub: 0,
})

const actions = {
  async init() {
    state.rateUsdInRub = await api.getRateUsdInRub()
    state.groupList = await api.getGroupList()
    state.productList = (await api.getProductList()).map((product) => {
      Object.defineProperty(product.price, 'RUB', {
        get() { return this.USD * state.rateUsdInRub },
      })
      return product
    })

    api.rateUsdInRubObserver.subscribe((value) => {
      state.rateUsdInRub = value
    })
  },

  setCartProductCount(product, count) {
    state.cartProductMap[product.id].count = Math.min(Math.max(count, 1), product.count)
  },

  deleteCartProduct(product) {
    delete state.cartProductMap[product.id]
  },

  toggleCartProduct(product) {
    if (product.id in state.cartProductMap) {
      delete state.cartProductMap[product.id]
    } else {
      state.cartProductMap[product.id] = { product, count: 1 }
    }
  },
}

const store = readonly({
  state,
  actions,
})

export default store
