<template>
  <div class="min-h-screen h-full bg-gray-800">
    <Navbar />
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/layouts/partials/Navbar'
import Header from '@/layouts/partials/Header'
export default {
  components: {
    Header,
    Navbar
  }
}
</script>
