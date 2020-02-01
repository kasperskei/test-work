<template lang="pug">
section.cart
  h2.cart-title Корзина

  table.cart-table
    thead.cart-header
      tr.card-header-row
        td.card-header-cell Наименование товара и описание
        td.card-header-cell Количество
        td.card-header-cell Цена
        td.card-header-cell

    tbody.cart-body
      tr.card-body-row(
        v-for="{ product, count } in cartProductMap"
        :key="product.id"
      )
        td.card-body-cell.product-name {{ product.name }}

        td.card-body-cell.cart-product-count
          input.cart-product-count-input(
            :value="count"
            :min="1"
            :max="product.count"
            type="number"
            @input="setCartProductCount(product, Number($event.target.value))"
          )
          span шт.

        td.card-body-cell
          span.product-price(
            v-watch:[onUpdatePrice]="product.price.RUB"
          ) {{ currencyFormatter(product.price.RUB) }}
          | /шт.

        td.card-body-cell.product-delete
          button.product-delete-button(
            @click="deleteCartProduct(product)"
          ) Удалить

    tfoot.cart-footer
      tr.card-footer-row
        td.card-footer-cell(
          colspan="4"
        )
          | Общая стоимость:
          |
          span.cart-product-price-total(
            v-watch:[onUpdatePrice]="priceRubTotal"
          ) {{ currencyFormatter(priceRubTotal) }}
</template>

<script>
import { computed, toRefs } from 'vue'
import store from '@/store'
import memoizeIntl from '@/lib/memoizeIntl'
import setNumberDiffClass from '@/lib/setNumberDiffClass'
import watch from '@/directives/watch'

export default {
  directives: {
    watch,
  },

  setup() {
    const { cartProductMap } = toRefs(store.state)
    const { deleteCartProduct, setCartProductCount } = toRefs(store.actions)

    const priceRubTotal = computed(() => Object
      .values(cartProductMap.value)
      .reduce((acc, { product, count }) => product.price.RUB * count + acc, 0))

    const currencyFormatter = memoizeIntl(Intl.NumberFormat)('ru', { style: 'currency', currency: 'RUB' })
    const onUpdatePrice = setNumberDiffClass()

    return {
      cartProductMap,
      priceRubTotal,
      currencyFormatter,
      onUpdatePrice,
      deleteCartProduct,
      setCartProductCount,
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

.card-header-cell
  border-bottom 1px solid #888888
  font-weight 600
  padding .5rem 1rem

.card-body-cell
  border-bottom 1px solid #888888
  padding 1rem

.card-footer-cell
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
