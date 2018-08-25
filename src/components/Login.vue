<template>
  <div class="login-form">
    <h2 class="mono"><a :class="{ active: isLogin }" @click="isLogin = !isLogin">Login</a> / <a :class="{ active: !isLogin }" @click="isLogin = !isLogin">Create</a></h2>
    <input type="text" v-model="username" placeholder="Username"><br>
    <input type="password" v-model="password" placeholder="Password"><br><br><br>
    <a @click="loginUser" id="loginButton" v-if="isLogin">Login</a>
    <a @click="createUser" id="loginButton" v-if="!isLogin">Create Account and Login</a>
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
        success_text: null,
        isLogin: true
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
              location.reload()
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
      },
      createUser() {
        if(this.username && this.password) {
          axios.post('http://' + location.hostname + ':3000/create-user', {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            if(res.data.success) {
              this.$store.commit('login', {username: res.data.username, apiKey: res.data.apiKey});
              location.reload()
            } else {
              this.success_text = res.data.error
            }
          })
          .catch(console.log)
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
    width: 300px;
    height: 200px;
    margin-left: 40%;
    margin-top: 15%;
    text-align: center;
    #loginButton {
      text-align: center;
      background-color: #011936;
      color: white;
      padding: 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .active {
      border: 1px solid #011936;
      border-radius: 4px;
    }
    a {
      padding: 10px;
    }
  }
</style>
