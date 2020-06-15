<template>
  <div>
    Blogs
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('blogs/initBlog')
  }
}
</script>

<style></style>
