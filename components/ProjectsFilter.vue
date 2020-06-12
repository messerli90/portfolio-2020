<template>
  <div class="mx-auto max-w-xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
    <ProjectsFilterItem v-for="(tag, i) in tags" :key="i" :tag="tag" />
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
    tags() {
      return this.$store.state.packages.tags
    }
  },
  methods: {
    //
  }
}
</script>

<style></style>
