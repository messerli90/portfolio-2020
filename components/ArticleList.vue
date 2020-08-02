<template>
  <ul class="">
    <li v-for="article of articles" :key="article.slug" class="py-6 border-b last:border-b-0">
      <time class="ml-auto text-gray-600 text-sm">{{ createdDate(article.createdAt) }}</time>
      <h3 class="text-3xl text-gray-800 font-semibold">
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
  methods: {
    createdDate(createdAt) {
      const date = new Date(createdAt);
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
      console.log(`${day}-${month}-${year}`);
      return `${day} - ${month} - ${year}`;
    },
  },
};
</script>

<style>
</style>