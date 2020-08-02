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

    <nav class="container mx-auto my-2 px-6 py-3 text-sm font-light">
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
        <li class="mx-2 text-gray-600 opacity-75">//</li>
        <li>
          <NuxtLink
            :to="{ name: 'projects' }"
            class="text-gray-700 hover:text-gray-900 hover:underline"
          >Projects</NuxtLink>
        </li>
        <li class="mx-2 text-gray-600 opacity-75">//</li>
        <li class="text-gray-800">{{ project.title }}</li>
        <li class="ml-auto text-gray-800">{{ createdDate }}</li>
      </ul>
    </nav>

    <div class="container mx-auto flex">
      <main class="px-3 flex-1">
        <article class="prose prose-sm lg:prose-lg max-w-4xl">
          <nuxt-content :document="project" />
        </article>
      </main>
      <aside class="flex-1 max-w-xs px-6">
        <div class="space-y-4">
          <client-only v-if="project.url">
            <a
              :href="project.url"
              class="relative flex items-center pl-16 py-2 bg-gray-600 text-white text-lg font-semibold rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:shadow-inner"
            >
              <span class="absolute left-0 py-2 pl-4">
                <fa :icon="faGlobe" class="mr-6 text-base" />
              </span>
              View Website
            </a>
          </client-only>
          <client-only v-if="project.packagist_url">
            <a
              :href="project.packagist_url"
              class="relative flex items-center pl-16 py-2 bg-gray-600 text-white text-lg font-semibold rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:shadow-inner"
            >
              <span class="absolute left-0 py-2 pl-4">
                <fa :icon="faBoxOpen" class="mr-6 text-base" />
              </span>
              View on Packagist
            </a>
          </client-only>
          <client-only v-if="project.github_url">
            <a
              :href="project.github_url"
              class="relative flex items-center pl-16 py-2 bg-gray-600 text-white text-lg font-semibold rounded transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:shadow-inner"
            >
              <span class="absolute left-0 py-2 pl-4">
                <fa :icon="faGithub" class="mr-6 text-base" />
              </span>
              View on Github
            </a>
          </client-only>
        </div>
      </aside>
    </div>
  </div>
</template>


<script>
import { faBoxOpen } from "@fortawesome/pro-duotone-svg-icons";
import { faGlobe } from "@fortawesome/pro-duotone-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default {
  async asyncData({ $content, params }) {
    const project = await $content("projects", params.slug).fetch();

    return { project };
  },

  computed: {
    faBoxOpen() {
      return faBoxOpen;
    },
    faGithub() {
      return faGithub;
    },
    faGlobe() {
      return faGlobe;
    },
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
