<template>
  <div class="bg-gray-700 min-h-screen">
    <nav class="bg-gray-800 text-white">
      <div class="container mx-auto pt-6 pb-32 -mb-24 flex items-center justify-between">
        <div class="text-3xl">
          <NuxtLink to="/">Michael Messerli</NuxtLink>
        </div>
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
