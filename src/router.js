import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'add-recipe',
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: () =>
        import(/* webpackChunkName: "add-recipe" */ './views/AddRecipe.vue'),
    },
  ],
})
