import { mount } from '@vue/test-utils'
import IndexPage from '@/components/index.vue'

describe('Index Page', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
