<template lang="pug">
details.product-list-group(
  open
)
  summary.group-title {{ group.name }}

  table.product-table
    tbody
      tr.product-row(
        v-for="product in productList"
        :key="product.id"
        :class="{ active: product.id in cartProductMap }"
        @click="toggleCartProduct(product)"
      )
        td.product-cell
          span.product-name {{ product.name }}
          span.product-count ({{ product.count }})

        td.product-cell.product-price(
          v-watch:[onUpdatePrice]="product.price.RUB"
        ) {{ formatCurrency(product.price.RUB) }}
</template>

<script>
import { toRefs } from 'vue'
import watch from '@/directives/watch'
import Group from '@/models/Group'
import store from '@/store'
import useCurrency from '@/hooks/useCurrency'
import useWatchDiff from '@/hooks/useWatchDiff'

export default {
  directives: {
    watch,
  },

  props: {
    group: {
      required: true,
      type: Group,
    },
  },

  setup({ group }) {
    const { cartProductMap } = toRefs(store.state)
    const { toggleCartProduct } = toRefs(store.actions)
    const productList = store.getters.getProductListByGroupId(group.id)

    const formatCurrency = useCurrency()
    const onUpdatePrice = useWatchDiff()

    return {
      cartProductMap,
      productList,
      toggleCartProduct,
      formatCurrency,
      onUpdatePrice,
    }
  },
}
</script>

<style lang="stylus" scoped>
.product-list-group
  user-select none

.group-title
  background-color #d2dee3
  border 1px solid #888888
  cursor pointer
  font-size 1.125rem
  font-weight 600
  padding .25rem .75rem

.product-table
  width 100%

.product-row
  cursor pointer

  &:hover
  &.active
    background-color #ecdfa8

    .product-price
      background-color #e1d5a0

  &:first-child .product-cell
    border-top none

.product-cell
  border 1px solid #888888
  padding .25rem .75rem

.product-price
  background-color #f3f3f3
  font-weight 600
  width 20%
  min-width 5rem
  text-align center

  &.up
    color red

  &.down
    color green
</style>
