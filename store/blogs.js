export const state = () => ({
  blogs: []
})

export const mutations = {
  setBlogs(state, blogs) {
    state.blogs = blogs
  }
}

export const actions = {
  async initBlog({ commit }) {
    this.$axios.setHeader('api-key', 'fMBxp1HsPXnSBK1DiRghqNFF')
    const blogs = await this.$axios.$get('https://dev.to/api/articles/me')

    console.log(blogs)

    commit('setBlogs', blogs.data)
  }
}
