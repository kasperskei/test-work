<template lang="pug">
section.products
  h2.products-title Продукты

  ul.product-group-list
    li.product-group-item(
      v-for="group in groupList"
      :key="group.id"
    )
      ProductGroup(
        :group="group"
      )
</template>

<script>
import { toRefs } from 'vue'
import store from '@/store'
import ProductGroup from '@/components/ProductGroup.vue'

export default {
  components: {
    ProductGroup,
  },

  setup() {
    const {
      groupList,
    } = toRefs(store.state)

    return {
      groupList,
    }
  },
}
</script>

<style lang="stylus" scoped>
.products-title
  font-size 1.5rem
  margin-bottom 1rem

.product-group-item
  &:not(:first-child)
    margin-top 1rem
</style>
