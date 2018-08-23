<template>
  <div id="sidebar">
    <router-link to="/">Home</router-link>
    <router-link to="/create-post">Create a post</router-link>
    <p v-if="!checkLoggedIn" class="error animated bounceInLeft">You are not logged in.</p>
    <a @click="logout" v-else>Logout</a>
    <div class="chat" v-if="chats.length" v-for="chat in chats" :key="chat.id">
      <h2>{{ chat.name }}</h2>
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
      axios.get('http://' + location.hostname + ':3000/get-chats?key=' + this.$store.state.user.apiKey)
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
div {
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
    &.router-link-exact-active {
      color: #004ba8;
      border: 1px solid #004ba8;
    }
  }
  p {
    bottom: 0;
    position: absolute;
  }
}
</style>
