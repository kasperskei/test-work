<template lang="pug">
section.product-list
  h2.product-title Продукты

  ul.product-group-list
    li.product-group-item(
      v-for="group in groupList"
      :key="group.id"
    )
      ProductListGroup(
        :group="group"
      )
</template>

<script>
import { toRefs } from 'vue'
import store from '@/store'
import ProductListGroup from '@/components/ProductListGroup.vue'

export default {
  components: {
    ProductListGroup,
  },

  setup() {
    const { groupList } = toRefs(store.state)

    return {
      groupList,
    }
  },
}
</script>

<style lang="stylus" scoped>
.product-list-title
  font-size 1.5rem
  margin-bottom 1rem

.product-group-list
  column-width 500px

.product-group-item
  break-inside avoid

  &:not(:first-child)
    margin-top 1rem
</style>
