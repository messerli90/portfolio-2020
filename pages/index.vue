<template>
  <div class="container mx-auto p-6 bg-white rounded shadow">
    <div>
      <h1 class="title">nuxt-blog</h1>
      <p>my blog</p>
    </div>
    <div class="">
      <ArticleList :articles="articles" />
    </div>
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
