import { computed, reactive, readonly } from 'vue'
import * as api from '@/api'

const state = reactive({
  groupList: [],
  productList: [],
  cartProductMap: {},
  rateUsdInRub: 0,
})

const getters = {
  getProductListByGroupId: (groupId) => computed(() => state.productList
    .filter((product) => product.groupId === groupId)),

  cartPrice: computed(() => Object
    .values(state.cartProductMap)
    .reduce(
      (acc, { product: { price }, count }) => Object
        .entries(acc)
        .map(([currency, total]) => [currency, price[currency] * count + total])
        |> Object.fromEntries,
      {
        USD: 0,
        RUB: 0,
      },
    )),
}

const actions = {
  async init() {
    const [
      rateUsdInRub,
      groupList,
      productList,
    ] = await Promise.all([
      api.getRateUsdInRub(),
      api.getGroupList(),
      api.getProductList(),
    ])

    api.rateUsdInRubObserver.subscribe((value) => {
      state.rateUsdInRub = value
    })

    state.rateUsdInRub = rateUsdInRub
    state.groupList = groupList
    state.productList = productList.map((product) => {
      Object.defineProperty(product.price, 'RUB', {
        get() { return this.USD * state.rateUsdInRub },
      })
      return product
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
  getters,
  actions,
})

export default store
