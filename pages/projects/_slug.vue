<template>
  <div class="mb-16">
    <header class="pb-8 flex flex-col items-center bg-gray-800">
      <h3>
        <NuxtLink
          :to="{ name: 'projects' }"
          class="uppercase text-2xl text-orange-500 hover:text-orange-600"
        >Projects</NuxtLink>
      </h3>
      <h1
        class="mb-4 text-4xl md:text-6xl text-center font-semibold text-gray-200 leading-tight"
      >{{ project.title }}</h1>
    </header>

    <nav class="container mx-auto px-6 py-3 text-sm font-light">
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
          <NuxtLink
            :to="{ name: 'projects' }"
            class="text-orange-500 hover:text-orange-600"
          >Projects</NuxtLink>
        </li>
        <li class="mx-2 text-gray-600">//</li>
        <li class="text-gray-800">{{ project.title }}</li>
        <li class="ml-auto text-gray-800">{{ createdDate }}</li>
      </ul>
    </nav>

    <main class="container mx-auto px-3 py-10 bg-white flex justify-center rounded shadow">
      <article class="prose prose-sm lg:prose-lg max-w-4xl">
        <nuxt-content :document="project" />
      </article>
    </main>
  </div>
</template>


<script>
export default {
  async asyncData({ $content, params }) {
    const project = await $content("projects", params.slug).fetch();

    return { project };
  },

  computed: {
    createdDate() {
      const date = new Date(this.project.createdAt);
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
