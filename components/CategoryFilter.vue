<template>
  <div
    class="block mb-3 mx-auto max-w-xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
  >
    <CategoryFilterItem
      v-for="(category, i) in categories"
      :key="i"
      :category="category"
    />
  </div>
</template>

<script>
import CategoryFilterItem from '@/components/CategoryFilterItem'
export default {
  components: {
    CategoryFilterItem
  },
  data() {
    return {
      //
    }
  },
  computed: {
    categories() {
      return this.$store.state.projects.categories
    }
  },
  methods: {
    //
  }
}
</script>

<style></style>
