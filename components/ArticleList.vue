<template>
  <ul class="rounded-lg shadow overflow-hidden">
    <li v-for="article of articles" :key="article.slug" class="px-6 py-3 border-b">
      <h3 class="text-lg text-gray-800 font-medium">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="hover:text-gray-900 hover:underline"
        >{{ article.title }}</NuxtLink>
      </h3>
      <p class="text-lg text-gray-700">{{ article.description }}</p>
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