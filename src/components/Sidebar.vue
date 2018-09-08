<template>
  <div id="sidebar">
    <h1 style="color:white">Waffle</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/create-post">Create a post</router-link>
    <p v-if="!checkLoggedIn" class="error animated bounceInLeft">You are not logged in.</p>
    <a @click="logout" v-else>Logout</a>
    <div id="chats" v-if="checkLoggedIn">
      <h2>Chats</h2>
      <router-link to="/create-chat">Create chat</router-link>
      <div class="chat" v-if="chats.length" v-for="chat in chats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: {id: chat.id} }"><h2>{{ chat.name }}</h2></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Sidebar',
  computed: {
     checkLoggedIn() {
       return !!this.$store.state.user.username
     }
  },
  data() {
    return {
      chats: []
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('vuex');
      this.$store.commit('logout');
    }
  },
  created() {
    if(this.$store.state.user.username) {
      axios.get('__API_ROOT__' + '/get-chats?key=' + this.$store.state.user.apiKey)
      .then((res) => {
        if(res.data.success) {
          this.chats = res.data.chats
        } else {
          console.log(res)
        }
      })
      .catch(console.log)
    }
  }
}
</script>

<style scoped lang="less">
//https://coolors.co/2b2d42-004ba8-ff6700-011936-e83f6f
#sidebar {
  overflow: auto;
  position: fixed;
  height: 100%;
  width: 300px;
  background-color: #011936;
  top: 0;
  left: 0;
  text-align: center;
  a {
    width: 80%;
    padding: 20px;
    margin: 5px;
    margin-top: 20px;
    float: left;
    border: 1px solid white;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    &.router-link-exact-active {
      color: #004ba8;
      border: 1px solid #004ba8;
    }
  }
  p {
    bottom: 0;
    position: absolute;
  }
  #chats {
    float: left;
    margin-top: 300px;
    width: 80%;
    border: 1px solid white;
    border-radius: 8px;
    //padding: 20px;
    margin: 5px;
    h2 {
      color: white;
    }
    a {

    }
    .chat {
      width: 100%;
      border-top: 1px solid white !important;
      border-bottom: 1px solid white !important;
      &:first-child {
        border-top: 0px solid white;
      }
      &:last-child {
        border-bottom: 0px solid white;
      }
    }
  }
}
</style>
