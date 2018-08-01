<template>
  <div class="login-form">
    <h1 class="mono">Login</h1>
    <input type="text" v-model="username" placeholder="Username"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <a @click="loginUser">Login</a>
    <p class="success-text">{{ success_text }}</p>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    props: {},
    data() {
      return {
        username: '',
        password: '',
        success_text: ''
      }
    },
    methods: {
      loginUser() {
        if (this.username && this.password) {
          axios.post('http://' + location.hostname + ':3000/login', {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            //console.log(response);
            if(response.data.success) {
              this.$store.commit('login', {username: response.data.username, apiKey: response.data.apiKey})
            } else {
              this.success_text = response.data.error
            }
          })
          .catch((error) => {
            console.log(error);
          })
        } else {
          this.success_text = "Please enter a username and password. ";
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .login-form {
    //margin: auto;
    border: 1px solid black;
    border-radius: 2px;
    width: 20%;
    margin-left: 40%;
    a {
      text-align: center;
      background-color: #0a1128;
      
    }
  }
</style>
