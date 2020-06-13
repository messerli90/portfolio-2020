<template>
  <button
    class="m-1 px-3 py-1 bg-gray-700 text-white hover:bg-gray-600 rounded-lg transition transform duration-200 ease-in-out"
    :class="{ 'bg-orange-500 hover:bg-orange-500 shadow': active }"
    @click="setCurrent"
  >
    {{ tag }}
  </button>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      //
    }
  },
  computed: {
    active() {
      return this.tag === this.$store.state.projects.currentTag
    }
  },
  methods: {
    setCurrent() {
      // console.log('set current')
      this.$store.dispatch('projects/updateCurrentTag', this.tag)
    }
  }
}
</script>

<style></style>
