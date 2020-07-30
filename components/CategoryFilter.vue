<template>
  <div class="mb-3 mx-auto max-w-xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
    <CategoryFilterItem
      v-for="(category, i) in categories"
      :key="i"
      :category="category"
      v-on:category-changed="updateCurrentCategory"
      :isActive="isActive(category)"
    />
  </div>
</template>

<script>
import CategoryFilterItem from "@/components/CategoryFilterItem";
export default {
  components: {
    CategoryFilterItem,
  },
  props: ["categories"],
  data() {
    return {
      activeCategory: 'Web Apps'
    };
  },
  computed: {
    //
  },
  methods: {
    isActive(c) {
      return this.activeCategory === c.name
    },
    updateCurrentCategory(c) {
      this.activeCategory = c.name
      this.$emit("category-changed", c);
    },
  },
};
</script>

<style></style>
