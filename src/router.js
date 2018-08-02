import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostById from './views/PostById.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:id',
      name: 'postById',
      component: PostById
    }
  ]
})
