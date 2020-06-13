<template>
  <div
    class="container mx-auto flex justify-end py-6 text-xl text-gray-400 font-medium"
  >
    <ul class="flex">
      <li
        class="mr-6 transition transform duration-200 ease-in-out"
        :class="
          isActive('index')
            ? 'text-orange-500 scale-105'
            : 'hover:text-white hover:scale-105'
        "
      >
        <a href="/">
          Projects
        </a>
      </li>
      <li
        class="mr-6 transition transform duration-200 ease-in-out"
        :class="
          isActive('blog')
            ? 'text-orange-500 scale-105'
            : 'hover:text-white hover:scale-105'
        "
      >
        <a href="blog">
          Blog
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.isActive('index')
  },
  methods: {
    isActive(page) {
      return page === this.$route.name
    }
  }
}
</script>
