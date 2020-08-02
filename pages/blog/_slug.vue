<template>
  <div class="container mx-auto mb-16 rounded shadow">
    <header>
      <div
        v-if="article.cover_image"
        class="relative py-12 lg:py-20 rounded-t overflow-hidden flex justify-center items-center bg-blue-100"
      >
        <img
          :src="article.cover_image"
          :alt="article.title"
          class="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <h2
          class="z-10 px-6 text-3xl lg:text-5xl text-center font-bold max-w-4xl text-blue-900 bg-blue-100 rounded-sm shadow-xs bg-opacity-50"
        >{{ article.title }}</h2>
      </div>
    </header>
    <nav class="px-6 py-3 text-sm font-light">
      <ul class="flex flex-wrap items-center">
        <li class="mr-2">
          <NuxtLink to="/" class="h-4 text-gray-600 hover:text-gray-800">
            <svg
              class="h-4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </NuxtLink>
        </li>
        <li class="mx-2 text-gray-600">//</li>
        <li>
          <NuxtLink :to="{ name: 'blog' }" class="text-orange-500 hover:text-orange-600">Blog</NuxtLink>
        </li>
        <li class="mx-2 text-gray-600">//</li>
        <li class="text-gray-800">{{ article.title }}</li>
        <li class="ml-auto text-gray-800">{{ createdDate }}</li>
      </ul>
    </nav>
    <main class="container mx-auto p-6 bg-white flex justify-center">
      <article class="flex-1 prose prose-sm lg:prose-lg max-w-4xl">
        <nuxt-content :document="article" />
      </article>
    </main>
  </div>
</template>


<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();

    return { article };
  },

  computed: {
    createdDate() {
      const date = new Date(this.article.createdAt);
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
      ] = dateTimeFormat.formatToParts(date);
      
      return `${day} - ${month} - ${year}`;
    },
  },
};
</script>
