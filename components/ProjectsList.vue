<template>
  <div>
    <h2 class="my-8 text-center text-4xl font-semibold text-gray-100">
      Projects
    </h2>
    <CategoryFilter />
    <TagFilter />
    <div class="mx-auto my-4 max-w-4xl grid grid-cols-2 gap-4">
      <ProjectCard v-for="(p, i) in projects" :key="i" :project="p" />
    </div>
  </div>
</template>

<script>
import CategoryFilter from '@/components/CategoryFilter'
import TagFilter from '@/components/TagFilter'
import ProjectCard from '@/components/ProjectCard'
export default {
  components: {
    CategoryFilter,
    TagFilter,
    ProjectCard
  },
  computed: {
    projects() {
      return this.$store.state.projects.filteredProjects
    }
  },
  methods: {
    //
  }
}
</script>

<style></style>
