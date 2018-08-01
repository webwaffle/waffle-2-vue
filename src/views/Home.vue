<template>
    <div id="home">
      <Login></Login>
    </div>
</template>

<script>
import axios from 'axios'
import Login from '@/components/Login.vue'
export default {
    name: 'Home',
    data() {
        return {
            /*username: '',
            password: '',
            error: ''*/
        }
    },
    components: {
      Login
    }
    /*methods: {
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
    }*/
}
</script>
