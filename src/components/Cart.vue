<template lang="pug">
section.cart
  h2.cart-title Корзина

  table.cart-table
    thead.cart-header
      tr.card-header-row
        td.card-table-header-cell Наименование товара и описание
        td.card-table-header-cell Количество
        td.card-table-header-cell Цена
        td.card-table-header-cell

    tbody.cart-body
      tr.card-body-row(
        v-for="{ product, count } in cartProductMap"
        :key="product.id"
      )
        td.card-table-body-cell.product-name {{ product.name }}

        td.card-table-body-cell.cart-product-count
          input.cart-product-count-input(
            :value="count"
            :min="1"
            :max="product.count"
            type="number"
            @input="setCartProductCount(product, Number($event.target.value))"
          )
          span шт.

        td.card-table-body-cell
          span.product-price(
            v-watch:[onUpdatePrice]="product.price.RUB"
          ) {{ formatCurrency(product.price.RUB) }}
          | /шт.

        td.card-table-body-cell.product-delete
          button.product-delete-button(
            @click="deleteCartProduct(product)"
          ) Удалить

    tfoot.cart-footer
      tr.card-footer-row
        td.card-table-footer-cell(
          colspan="4"
        )
          | Общая стоимость:
          |
          span.cart-product-price-total(
            v-watch:[onUpdatePrice]="cartPrice.RUB"
          ) {{ formatCurrency(cartPrice.RUB) }}
</template>

<script>
import { toRefs } from 'vue'
import watch from '@/directives/watch'
import store from '@/store'
import useCurrency from '@/hooks/useCurrency'
import useWatchDiff from '@/hooks/useWatchDiff'

export default {
  directives: {
    watch,
  },

  setup() {
    const { cartProductMap } = toRefs(store.state)
    const { deleteCartProduct, setCartProductCount } = toRefs(store.actions)
    const { cartPrice } = toRefs(store.getters)

    const formatCurrency = useCurrency()
    const onUpdatePrice = useWatchDiff()

    return {
      cartProductMap,
      cartPrice,
      deleteCartProduct,
      setCartProductCount,
      formatCurrency,
      onUpdatePrice,
    }
  },
}
</script>

<style lang="stylus" scoped>
.cart-title
  font-size 1.5rem
  margin-bottom 1rem

.cart-table
  width 100%

  .card-table-header-cell
    border-bottom 1px solid #888888
    font-weight 600
    padding .5rem 1rem

  .card-table-body-cell
    border-bottom 1px solid #888888
    padding 1rem

  .card-table-footer-cell
    padding .5rem 1rem
    text-align right

.cart-product-count-input
  border 1px solid #cccccc
  width auto

  &:invalid
    border-color red

.product-delete
  text-align right

  .product-delete-button
    text-decoration underline

.product-price
.cart-product-price-total
  font-size 1.125rem
  font-weight 600

  &.up
    color red

  &.down
    color green
</style>
