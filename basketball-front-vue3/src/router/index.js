import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/games/AllGamesView.vue")
    },
    {
      path: '/createGame',
      name: 'createGame',
      component: () => import("../views/games/CreateGameView.vue")
    },
    {
      path: '/players',
      name: 'players',
      component: () => import("../views/players/AllPlayersView.vue")
    },
    {
      path: '/createPlayer',
      name: 'createPlayer',
      component: () => import("../views/players/CreatePlayerView.vue")
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import("../views/teams/AllTeamsView.vue")
    },
    {
      path: '/createTeam',
      name: 'createTeam',
      component: () => import("../views/teams/CreateTeamView.vue")
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
