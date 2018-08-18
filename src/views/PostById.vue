<template>
<div class="PostById animated bounceInDown">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content" v-html="post.content"></p>
  <LikeButton :id="parseInt($route.params.id, 10)"></LikeButton>
  <p class="likes">{{ post.likes }}</p>
  <div class="comment" v-for="comment in post.comments">
    <p>{{ comment.comment }}</p>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import converter from '@/converter'
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
      Vue.set(this.post, 'posted', moment(this.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow());
      Vue.set(this.post, 'content', converter.makeHtml(this.post.content))
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less">

</style>
