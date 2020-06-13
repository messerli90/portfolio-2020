<template>
  <div class="block mb-3 mx-auto max-w-3xl flex flex-wrap justify-center">
    <TagFilterItem v-for="(tag, i) in tags" :key="i" :tag="tag">
    </TagFilterItem>
  </div>
</template>

<script>
import TagFilterItem from '@/components/TagFilterItem'
export default {
  components: {
    TagFilterItem
  },
  computed: {
    tags() {
      return this.$store.state.projects.tags
    }
  }
}
</script>

<style></style>
