import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: () => import('./views/Recipe.vue'),
      props: true,
      children: [
        {
          path: ':id',
          name: 'update-recipe',
          component: () => import('./views/Recipe.vue'),
        },
      ],
    },
    { path: '*', redirect: '/' },
  ],
})
