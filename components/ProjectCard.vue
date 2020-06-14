<template>
  <div class="relative bg-gray-700 rounded-lg shadow overflow-hidden">
    <span
      class="absolute top-0 right-0 m-3 py-1 px-3 text-sm text-white rounded opacity-75 hover:opacity-100"
      :class="categoryTagColor"
    >
      {{ project.category }}
    </span>
    <img :src="project.image" alt="" class="w-full h-40 object-cover" />
    <div class="px-4 py-3">
      <h5 class="my-1 tracking-wide text-lg text-orange-500 font-medium">
        {{ project.title }}
      </h5>
      <p class="mb-3 text-gray-400">{{ project.description }}</p>
      <div class="flex justify-between items-baseline">
        <a
          :href="project.url"
          target="_blank"
          class="flex items-center transition transform duration-200 ease-in-out text-gray-600 hover:text-gray-500"
        >
          Visit Site
          <span class="ml-1">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
              ></path>
              <path
                d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
              ></path>
            </svg>
          </span>
        </a>
        <a href="#" class="text-teal-300 hover:underline">Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    categoryTagColor() {
      return (
        this.$store.state.projects.categories.find(
          (c) => c.name === this.project.category
        )?.bgColor || 'bg-red-500'
      )
    }
  }
}
</script>

<style></style>
