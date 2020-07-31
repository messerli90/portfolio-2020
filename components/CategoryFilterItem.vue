<template>
  <button
    role="button"
    class="p-3 flex flex-row md:flex-col justify-start md:justify-center items-center hover:bg-gray-700 rounded-lg transition transform duration-200 ease-in-out hover:scale-105"
    :class="{ 'bg-orange-500 hover:bg-orange-500 shadow': active }"
    @click="setCurrent"
  >
    <span class="m-2 text-orange-400">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path clip-rule="evenodd" fill-rule="evenodd" :d="category.icon" />
      </svg>
    </span>
    <span class="text-orange-500" :class="{ 'text-orange-100': active }">{{ category.name }}</span>
  </button>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
  },
  computed: {
    active() {
      return this.isActive;
    },
  },
  methods: {
    setCurrent() {
      this.$emit("category-changed", this.category);
    },
  },
};
</script>

<style></style>
