<template>
  <div class="relative flex flex-col bg-gray-700 rounded-lg shadow overflow-hidden">
    <span
      class="absolute top-0 right-0 m-3 py-1 px-3 text-sm text-white rounded opacity-75 hover:opacity-100"
    >{{ project.category }}</span>
    <span class="overflow-hidden">
      <img
        :src="project.cover_image"
        alt
        class="w-full h-40 flex-shrink-0 object-cover transition transform duration-200 ease-in-out hover:scale-105"
      />
    </span>
    <div class="flex-1 px-4 py-3 flex flex-col">
      <h5 class="my-1 tracking-wide text-lg text-orange-500 font-medium">{{ project.title }}</h5>
      <p class="mb-3 text-gray-400">{{ project.description }}</p>
      <div class="mt-auto flex justify-between items-baseline">
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
              />
              <path
                d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
              />
            </svg>
          </span>
        </a>
        <NuxtLink
          :to="{ name: 'projects-slug', params: { slug: project.slug } }"
          class="text-teal-300 hover:underline"
        >Read more</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    //
  },
  methods: {
    openModal() {
      this.$emit("project-selected", this.project);
      // console.log("open modal");
    },
  },
};
</script>

<style></style>
