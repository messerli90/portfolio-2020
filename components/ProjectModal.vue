<template>
  <div
    v-if="isOpen"
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <transition
      enter-active-class="ease-out duration-700"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-in duration-700"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="fixed inset-0 transition-opacity"
        @click="closeModal"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>
    <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
    <transition
      enter-active-class="ease-out duration-700"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-700"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          class="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col"
        >
          <button
            class="block absolute top-0 right-0 m-4 p-2 flex justify-center items-center rounded-full bg-gray-900 text-gray-200 z-10 opacity-75 transition transform duration-200 ease-in-out hover:scale-105 hover:opacity-100"
            @click="closeModal"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <client-only v-if="project.images" placeholder="Loading...">
            <agile class="rounded-md overflow-hidden">
              <div
                v-for="(img, i) in project.images"
                :key="i"
                class="relative slide"
              >
                <div class="h-100 text-center">
                  <img
                    :src="img.src"
                    :alt="img.alt"
                    class="h-100 object-center"
                  />
                </div>
                <p
                  class="absolute bottom-0 inset-x-0 p-2 bg-gray-800 bg-opacity-75 text-center text-white z-10"
                >
                  {{ img.caption }}
                </p>
              </div>
            </agile>
          </client-only>
          <h4 class="my-2 text-xl font-medium text-indigo-600">
            {{ project.title }}
          </h4>
          <div class="mb-3 text-gray-700">
            <p>{{ project.description }}</p>
          </div>
          <div v-if="project.stack">
            <p class="mb-1 font-medium text-gray-800">Built with:</p>
            <ul class="flex flex-wrap text-sm space-x-2">
              <li
                v-for="(tech, i) in project.stack"
                :key="i"
                class="mb-2 px-3 py-1 bg-gray-300 text-gray-900 rounded-sm"
              >
                {{ tech }}
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-gray-100 px-4 py-3 sm:px-6 flex text-sm">
          <span v-if="project.url" class="mr-3">
            <a
              :href="project.url"
              target="_blank"
              class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >Visit Site</a
            >
          </span>
          <span v-if="project.github_url" class="mr-3">
            <a
              :href="project.github_url"
              target="_blank"
              class="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
              >View on Github</a
            >
          </span>
          <span v-if="project.packagist_url" class="mr-3">
            <a
              :href="project.packagist_url"
              target="_blank"
              class="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >View on Packagist</a
            >
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    }
  },
  computed: {
    isOpen() {
      return !!this.project
    },
    project() {
      return this.$store.state.projects.current
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('projects/setCurrent', null)
    }
  }
}
</script>

<style scoped>
.agile--ssr .agile__slides > * {
  overflow: hidden;
  width: 0;
}

.agile--ssr .agile__slides > *:first-child {
  width: 100%;
}
</style>
