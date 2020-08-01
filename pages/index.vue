<template>
  <div>
    <header class="bg-gray-800 pb-16">
      <div class="container mx-auto text-gray-200">
        <!-- <p class="text-4xl md:text-4xl text-center md:text-left">Hi 👋 I'm...</p> -->
        <h1 class="text-5xl md:text-6xl font-semibold text-gray-200 leading-tight">Michael Messerli</h1>
        <div class="mt-3 space-y-3 font-thin">
          <p class="text-2xl md:text-3xl text-gray-400">
            <span class="font-semibold text-indigo-300">Full Stack Developer</span>
            who's first love is
            <span
              class="font-semibold text-red-500"
            >Laravel &amp; VueJS</span> but
            enjoys tinkering and exploring new stacks
          </p>
          <!-- <p class="text-2xl md:text-3xl text-gray-400">I build stuff on the internet</p> -->
          <p class="text-2xl md:text-3xl text-gray-400">
            <span class="font-semibold text-indigo-300">Maker</span> of 🕵️‍♀️
            <a
              href="https://jobhuntbuddy.co"
              target="_blank"
              class="mr-2 font-semibold text-orange-500 hover:underline"
            >JobHuntBuddy</a>
            🔫
            <a
              href="https://siegrs.gg"
              target="_blank"
              class="mr-3 font-semibold text-orange-500 hover:underline"
            >Siegrs.GG</a> and
            <NuxtLink to="/projects" class="mx-3 font-semibold text-orange-500 hover:underline">more</NuxtLink>
          </p>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-2">
      <h2 class="mt-8 text-gray-700 text-xl tracking-wider uppercase">Blog Posts</h2>
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
