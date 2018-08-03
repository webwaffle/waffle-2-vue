<template>
<div class="PostById animated bounceInDown" v-if="post">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content">{{ post.content }}</p>
  <LikeButton v-bind:id="post.id"></LikeButton>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import LikeButton from '@/components/LikeButton.vue'
export default {
  data() {
    return {
      post: {}
    }
  },
  components: {
    LikeButton
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/post/' + this.$route.params.id)
    .then(res => {
      Vue.set(this, 'post', res.data.post);
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
