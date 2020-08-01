<template>
  <div class>
    <header class="bg-gray-800 pb-24">
      <div class="container mx-auto text-gray-200">
        <h1
          class="mb-4 text-5xl md:text-6xl text-center font-semibold text-gray-200 leading-tight"
        >Projects</h1>
        <CategoryFilter :categories="categories" v-on:category-changed="updateCurrentCategory" />
        <TagFilter :tags="tags" v-on:update-active-tags="updateActiveTags" />
      </div>
    </header>

    <div class="container mx-auto -my-16 mb-4 grid md:grid-cols-3 gap-6">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="i"
        :project="p"
        class="transform transition-all"
        v-on:project-selected="setProject"
      />
    </div>
    <ProjectModal :project="selectedProject" v-on:close-project-modal="selectedProject = null" />
  </div>
</template>

<script>
// import ProjectRepo from "~/content/projects";
import CategoryRepo from "~/content/categories";
import TagRepo from "~/content/tags";
import ProjectCard from "~/components/ProjectCard";
import CategoryFilter from "~/components/CategoryFilter";
import TagFilter from "~/components/TagFilter";
import ProjectModal from "~/components/ProjectModal";

export default {
  components: { ProjectCard, CategoryFilter, TagFilter, ProjectModal },
  data() {
    return {
      currentCategory: "Web Apps",
      currentTags: [],
      selectedProject: null,
      marked: [],
    };
  },
  computed: {
    projects() {
      let projects = this.markedprojects.filter(
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
  async asyncData({ $content, params }) {
    const markedprojects = await $content("projects").fetch();

    return { markedprojects };
  },
  methods: {
    setProject(project) {
      console.log(project);
      this.selectedProject = project;
    },
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