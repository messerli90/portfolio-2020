<template>
  <div class="mx-auto max-w-xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
    <ProjectsFilterItem
      v-for="(category, i) in categories"
      :key="i"
      :category="category"
    />
  </div>
</template>

<script>
import ProjectsFilterItem from '@/components/ProjectsFilterItem'
export default {
  components: {
    ProjectsFilterItem
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
