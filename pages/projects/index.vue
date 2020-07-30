<template>
  <div>
    <header class="flex flex-col items-center">
      <h2 class="mb-16 text-5xl text-gray-100 font-bold">Projects</h2>
      <!-- <p class="py-6 text-lg text-center text-gray-300">Things I've built</p> -->
    </header>
    <CategoryFilter :categories="categories" v-on:category-changed="updateCurrentCategory" />
    <TagFilter :tags="tags" v-on:update-active-tags="updateActiveTags" />
    <div class="mx-auto my-4 grid md:grid-cols-2 gap-6">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="i"
        :project="p"
        class="transform transition-all"
      />
    </div>
  </div>
</template>

<script>
import ProjectRepo from "~/content/projects";
import CategoryRepo from "~/content/categories";
import TagRepo from "~/content/tags";
import ProjectCard from "~/components/ProjectCard";
import CategoryFilter from "~/components/CategoryFilter";
import TagFilter from "~/components/TagFilter";

export default {
  components: { ProjectCard, CategoryFilter, TagFilter },
  data() {
    return {
      currentCategory: "Web Apps",
      currentTags: [],
    };
  },
  computed: {
    projects() {
      let projects = ProjectRepo.filter(
        (p) => p.category === this.currentCategory
      );
      if (this.currentTags.length > 0) {
        projects = projects.filter((p) =>
          p.tags.some((t) => this.currentTags.includes(t))
        );
        console.log(projects);
      }

      return projects;
    },
    categories() {
      return CategoryRepo;
    },
    tags() {
      return TagRepo;
    },
  },
  methods: {
    updateCurrentCategory(category) {
      this.currentCategory = category.name;
    },
    updateActiveTags(tags) {
      console.log("updating tags");
      this.currentTags = tags;
    },
  },
};
</script>

<style>
</style>