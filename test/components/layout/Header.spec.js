import { mount } from '@vue/test-utils'
import Header from '@/components/layout/Header.vue'

describe('Index Page', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Header)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
