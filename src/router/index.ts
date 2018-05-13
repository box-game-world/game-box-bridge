import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/main.vue'
import World from '../pages/world.vue'

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/world',
      component: World  
    }
  ]
})
