<template>
  <div>
    <header class="flex flex-col items-center">
      <h2 class="mb-16 text-5xl text-gray-100 font-bold">Blog Posts</h2>
      <!-- <p class="py-6 text-lg text-center text-gray-300">Things I've built</p> -->
    </header>
    <main class="container mx-auto px-2 bg-white rounded shadow">
      <ArticleList :articles="articles" />
    </main>
  </div>
</template>

<script>
import ArticleList from "~/components/ArticleList";
export default {
  components: { ArticleList },
  async asyncData({ $content, params }) {
    const articles = await $content("articles")
      .only(["title", "slug", "description"])
      .fetch();

    return { articles };
  },
};
</script>

<style>
</style>
