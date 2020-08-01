<template>
  <div class="antialiasedbg-gray-200 min-h-screen">
    <nav class="bg-gray-800 text-white">
      <div class="container mx-auto pt-6 pb-32 -mb-24 flex items-center justify-between">
        <h2 class="text-3xl">
          <NuxtLink to="/" class="font-semibold">Michael Messerli</NuxtLink>
        </h2>
        <div>
          <ul class="flex items-center justify-end">
            <li class="mr-4">
              <NuxtLink to="/">Blog</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'projects' }">Projects</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mx-auto">
      <Nuxt />
    </div>
  </div>
</template>

<style>
</style>
