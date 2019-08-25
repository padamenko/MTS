import Vue from 'vue'
import Router from 'vue-router'
import GamesList from '@/components/GamesList'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GamesList',
      component: GamesList
    },
    {
      path: '/game/',
      name: 'Game',
      component: Game
    },
  ]
})
