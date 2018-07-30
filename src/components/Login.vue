<template>
  <div class="login-form">
    <input type="text" v-model="username" placeholder="Username"><br>
    <input type="password" v-model="password" value="Password"><br>
    <button @click="loginUser">Login</button>
    <p class="success-text"></p>
  </div>
</template>

<script>
  export default {
    props: {},
  }
</script>
