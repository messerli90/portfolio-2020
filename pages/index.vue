<template>
  <div class="container mx-auto p-4">
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
    this.$store.dispatch('packages/initState')
  }
}
</script>

<style></style>
