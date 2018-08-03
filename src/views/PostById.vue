<template>
<div class="PostById animated bounceInDown" v-if="post">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content">{{ post.content }}</p>
  <button class="like" @click="likePost"><i class="material-icons">favorite</i></button>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      post: {}
    }
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/post/' + this.$route.params.id)
    .then(res => {
      this.post = res.data.post;
      this.post.posted = moment(this.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow();
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    likePost() {
      axios.put('http://' + location.hostname + ':3000/like/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey, {})
      .then(res => {
        if(res.data.success) {
          console.log('liked')
        } else {
          console.log(res.data.error)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">

</style>
