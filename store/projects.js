import ProjectRepository from '@/repositories/ProjectRepository'
import CategoryRepository from '@/repositories/CategoryRepository'
import TagRepository from '@/repositories/TagRepository'

export const state = () => ({
  currentTag: {},
  currentCategory: {},

  tags: [],
  categories: [],
  projects: [],

  filteredProjects: []
})

export const mutations = {
  setTags(state, tags) {
    state.tags = tags
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setCurrentTag(state, tag) {
    state.currentTag = tag
  },
  setCurrentCategory(state, category) {
    state.currentCategory = category
  },
  setFilteredProjects(state, projects) {
    state.filteredProjects = projects
  },
  filterProjects(state, tag) {
    // TODO make this reactive to currentTag and currentCategory
    state.filteredProjects = state.projects.filter((p) => {
      return p.type === tag.slug
    })
  }
}

export const actions = {
  initState({ commit }) {
    commit('setProjects', ProjectRepository.all())
    commit('setFilteredProjects', ProjectRepository.all())
    commit('setTags', TagRepository.all())
    commit('setCategories', CategoryRepository.all())
  },
  async updateCurrentCategory({ commit }, category) {
    await commit('setCurrentCategory', category)
    commit('filterProjects', category)
  }
}
