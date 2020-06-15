import ProjectRepository from '@/repositories/ProjectRepository'
import CategoryRepository from '@/repositories/CategoryRepository'

export const state = () => ({
  current: {},
  currentTag: '',
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
  setCurrent(state, project) {
    state.current = project
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
  filterProjects(state) {
    state.filteredProjects = state.projects.filter((p) => {
      return p.category === state.currentCategory.name
    })
    if (state.currentTag) {
      state.filteredProjects = state.projects.filter((p) => {
        return p.tags.includes(state.currentTag)
      })
    }
  }
}

export const actions = {
  async initState({ commit, state }) {
    const projects = ProjectRepository.all()

    commit('setProjects', projects)
    commit('setFilteredProjects', projects)
    commit('setTags', getTagsFromProjects(projects))
    await commit('setCategories', CategoryRepository.all())
    await commit('setCurrentCategory', CategoryRepository.all()[0])
    commit('filterProjects')
    // Modal test
    commit('setCurrent', state.projects[0])
  },
  async updateCurrentCategory({ state, commit }, category) {
    await commit('setCurrentCategory', category)
    await commit('setCurrentTag', '')
    await commit('filterProjects')
    commit('setTags', getTagsFromProjects(state.filteredProjects))
  },
  async updateCurrentTag({ commit }, tag) {
    await commit('setCurrentTag', tag)
    commit('filterProjects')
  },
  setCurrentProject({ commit }, project) {
    commit('setCurrent', project)
  }
}

function getTagsFromProjects(projects) {
  const tags = projects.flatMap((project) => {
    return project.tags
  })
  return tags.filter(unique)
}

function unique(value, index, self) {
  return self.indexOf(value) === index
}
