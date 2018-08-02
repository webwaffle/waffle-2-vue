<template>
  <div class="login-form">
    <h1 class="mono">Login</h1>
    <input type="text" v-model="username" placeholder="Username"><br>
    <input type="password" v-model="password" placeholder="Password"><br><br><br>
    <a @click="loginUser">{{ button_text }}</a>
    <p class="success-text" v-if="success_text">{{ success_text }}</p>
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
        button_text: 'Login',
        success_text: null
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
              this.$store.commit('login', {username: response.data.username, apiKey: response.data.apiKey});
              this.button_text = 'Logged In!';
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
    border-radius: 5px;
    width: 20%;
    height: 200px;
    margin-left: 40%;
    margin-top: 15%;
    text-align: center;
    a {
      text-align: center;
      background-color: #0a1128;
      color: white;
      padding: 20px;
      border-radius: 5px;
    }
  }
</style>
