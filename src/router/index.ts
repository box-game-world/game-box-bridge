import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/main.vue'
import Game from '../pages/game.vue'
import Result from '../pages/result.vue'

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/game',
      component: Game  
    },
    {
      path: '/result',
      component: Result  
    }
  ]
})
