<template>
<div class="PostById animated bounceInDown">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content">{{ post.content }}</p>
  <LikeButton :id="post.id" :liked="liked"></LikeButton>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import LikeButton from '@/components/LikeButton.vue'
export default {
  data() {
    return {
      post: {},
      liked: false
    }
  },
  components: {
    LikeButton
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/post/' + this.$route.params.id)
    .then(res => {
      Vue.set(this, 'post', res.data.post);
      //console.log(res.data.post)
      this.post.posted = moment(this.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow();
    })
    .catch(error => {
      console.log(error)
    })
    axios.get('http://' + location.hostname + ':3000/checkliked/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey)
    .then(res => {
      if(res.data.success) {
        this.liked = res.data.liked;
      } else {
        console.log(res)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less">

</style>
