<template>
  <div id="sidebar">
    <router-link to="/">Home</router-link>
    <router-link to="/create-post">Create a post</router-link>
    <p v-if="!checkLoggedIn" class="error animated bounceInLeft">You are not logged in.</p>
    <a @click="logout" v-else>Logout</a>
  </div>
</template>

<script>
export default {
  computed: {
     checkLoggedIn() {
       return !!this.$store.state.user.username
     }
  },
  methods: {
    logout() {
      localStorage.removeItem('vuex');
      this.$store.commit('logout');
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
