<template>
  <div class="container mx-auto p-4">
    <div
      class="h-1 w-full max-w-2xl mx-auto my-8 border-t border-gray-700"
    ></div>
    <ProjectList />
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectsList'

export default {
  components: {
    ProjectList
  },
  created() {
    this.$store.dispatch('projects/initState')
  }
}
</script>

<style></style>
