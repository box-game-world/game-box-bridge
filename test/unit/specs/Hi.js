import Vue from 'vue'
import HelloWorld from '@/components/Hi'

describe('hi.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1.hi').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
