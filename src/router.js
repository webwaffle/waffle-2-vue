import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostById from './views/PostById.vue'
import CreatePost from './views/CreatePost.vue'

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
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost
    }
  ]
})
