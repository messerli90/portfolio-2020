<template>
  <button
    role="button"
    class="p-3 flex flex-row md:flex-col justify-start md:justify-center items-center rounded-lg transition transform duration-200 ease-in-out hover:scale-105"
    :class="{ 'bg-orange-500 shadow': active }"
    @click="setCurrent"
  >
    <span class="m-2 text-orange-200">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path clip-rule="evenodd" fill-rule="evenodd" :d="tag.icon"></path>
      </svg>
    </span>
    <span class="text-orange-100">{{ tag.name }}</span>
  </button>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  computed: {
    active() {
      return this.tag.slug === this.$store.state.packages.currentTag?.slug
    }
  },
  methods: {
    setCurrent() {
      this.$store.commit('packages/setCurrentTag', this.tag)
    }
  }
}
</script>

<style></style>
