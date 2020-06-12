<template>
  <button
    role="button"
    class="p-3 flex flex-row md:flex-col justify-start md:justify-center items-center hover:bg-gray-700 rounded-lg transition transform duration-200 ease-in-out hover:scale-105"
    :class="{ 'bg-orange-500 hover:bg-orange-500 shadow': active }"
    @click="setCurrent"
  >
    <span class="m-2 text-orange-200">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path clip-rule="evenodd" fill-rule="evenodd" :d="category.icon"></path>
      </svg>
    </span>
    <span class="text-orange-100">{{ category.name }}</span>
  </button>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  computed: {
    active() {
      return (
        this.category.slug === this.$store.state.projects.currentCategory?.slug
      )
    }
  },
  methods: {
    setCurrent() {
      this.$store.dispatch('projects/updateCurrentCategory', this.category)
    }
  }
}
</script>

<style></style>
