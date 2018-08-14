<template>
<div class="PostById animated bounceInDown">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content">{{ post.content }}</p>
  <LikeButton :id="parseInt($route.params.id, 10)"></LikeButton>
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
  }
}
</script>

<style lang="less">

</style>
