<template>
  <div>
    <h2 class="my-4 text-center text-4xl font-semibold text-gray-100">
      Some of my projects
    </h2>
    <CategoryFilter />
    <TagFilter />
    <div class="mx-auto my-4 max-w-4xl grid md:grid-cols-2 gap-6">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="i"
        :project="p"
        class="transform transition-all"
      />
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
