import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostById from './views/PostById.vue'
import CreatePost from './views/CreatePost.vue'
import Chat from './views/Chat.vue'
import CreateChat from './views/CreateChat.vue'
import User from './views/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: Chat
    },
    {
      path: '/create-chat',
      name: 'createChat',
      component: CreateChat
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User
    }
  ]
})
