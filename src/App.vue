<template lang="pug">
#app
  .section
    Products

  .section
    Cart
</template>

<script>
import Products from '@/components/Products.vue'
import Cart from '@/components/Cart.vue'

export default {
  components: {
    Products,
    Cart,
  },
}
</script>

<style lang="stylus" scoped>
.section
  padding 2rem
</style>
