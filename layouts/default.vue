<template>
  <div class="min-h-screen h-full bg-gray-800">
    <Navbar />
    <Header />
    <nuxt />
    <ProjectModal />
  </div>
</template>

<script>
import Navbar from '@/layouts/partials/Navbar'
import Header from '@/layouts/partials/Header'
import ProjectModal from '@/components/ProjectModal'
export default {
  components: {
    Header,
    Navbar,
    ProjectModal
  }
}
</script>
