<template>
  <div class="antialiasedbg-gray-200 min-h-screen">
    <nav class="bg-gray-800 text-white">
      <div class="container mx-auto pt-6 pb-32 -mb-24 flex items-center justify-between">
        <h2 class="text-3xl">
          <NuxtLink to="/" class="font-semibold">
            <img
              src="/images/knifely_new.png"
              alt="logo"
              class="h-12 w-12 rounded-full transition-all transform duration-200 hover:rotate-180"
            />
            <!-- Michael Messerli -->
          </NuxtLink>
        </h2>
        <div>
          <ul class="flex items-center justify-end text-xl">
            <li
              class="px-4 py-1 rounded transform transition-colors duration-150 ease-in-out hover:bg-gray-900"
            >
              <NuxtLink :to="{ name: 'blog' }">Blog</NuxtLink>
            </li>
            <li
              class="px-4 py-1 rounded transform transition-colors duration-150 ease-in-out hover:bg-gray-900"
            >
              <NuxtLink :to="{ name: 'projects' }">Projects</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<style>
</style>
