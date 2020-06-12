import ProjectRepository from '@/repositories/ProjectRepository'
import TagRepository from '@/repositories/TagRepository'

export const state = () => ({
  currentTag: {},
  tags: [],
  projects: [],
  filteredProjects: []
})

export const mutations = {
  setTags(state, tags) {
    state.tags = tags
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setCurrentTag(state, tag) {
    state.currentTag = tag
  },
  setFilteredProjects(state, projects) {
    state.filteredProjects = projects
  },
  filterProjects(state, tag) {
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
  },
  updateCurrentTag({ commit }, tag) {
    commit('setCurrentTag', tag)
    commit('filterProjects', tag)
  }
}
