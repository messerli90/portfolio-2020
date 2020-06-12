<template>
  <button
    class="m-2 px-3 py-1 bg-gray-700 text-white hover:bg-gray-600 rounded-lg transition transform duration-200 ease-in-out"
    :class="{ 'bg-orange-500 hover:bg-orange-500 shadow': active }"
    @click="active = !active"
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
      active: false
    }
  },
  computed: {
    // active() {}
  }
}
</script>

<style></style>
