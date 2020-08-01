<template>
  <ul class>
    <li v-for="article of articles" :key="article.slug" class="px-2 py-6 border-b last:border-b-0">
      <h3 class="text-xl text-gray-800 font-semibold">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="hover:text-gray-900 hover:underline"
        >{{ article.title }}</NuxtLink>
      </h3>
      <p class="text-xl text-gray-700 font-light">{{ article.description }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>