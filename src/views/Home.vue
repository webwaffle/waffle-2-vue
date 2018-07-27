<template>
    <div id="login">
        <input type="text" id="username" v-model="username">
        <input type="password" id="password" v-model="password">
        <button id="login" @click="logIn">Login</button>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        logIn() {
            console.log('Logging in...')
            axios.post('http://' + location.hostname + ':3000/login', {
                username: this.username,
                password: this.password
            })
            .then((response) => {
                //console.log(response);
                if(response.success) {
                    console.log('logged in');
                } else {
                    this.error = response.error
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
