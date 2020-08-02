<template>
  <div>
    <header class="bg-gray-800 pb-12">
      <div class="container mx-auto text-gray-200">
        <h1
          class="mb-4 text-5xl md:text-6xl text-center font-semibold text-gray-200 leading-tight"
        >Blog Posts</h1>
      </div>
    </header>
    <main class="container mx-auto px-2">
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
      .only(["title", "slug", "description", "createdAt"])
      .fetch();

    return { articles };
  },
};
</script>

<style>
</style>
