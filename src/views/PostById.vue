<template>
<div class="PostById" v-if="post">
  <h1>{{ post.title }}</h1>
  <p class="author">By {{ post.poster }}</p>
  <p class="content">{{ post.content }}</p>
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
      this.post = res.data.post
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less">

</style>
