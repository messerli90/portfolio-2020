<template>
  <div class="container mx-auto p-6 bg-white rounded shadow flex justify-center">
    <article class="prose prose-lg max-w-4xl">
      <nuxt-content :document="article" />
    </article>
  </div>
</template>


<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();

    return { article };
  },
};
</script>
