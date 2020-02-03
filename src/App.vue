<template lang="pug">
#app
  .section
    ProductList

  .section
    Cart
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import Cart from '@/components/Cart.vue'

export default {
  components: {
    ProductList,
    Cart,
  },
}
</script>

<style lang="stylus" scoped>
#app
  max-width 1100px
  margin 0 auto

.section
  padding 2rem
</style>
