<template>
  <div class="min-h-screen h-full bg-gray-800">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/layouts/partials/Header'
export default {
  components: {
    Header
  }
}
</script>
