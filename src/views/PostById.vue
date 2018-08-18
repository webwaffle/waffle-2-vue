<template>
<div class="PostById animated bounceInDown">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <p class="author">By {{ post.poster }}</p>
  <p class="content" v-html="post.content"></p>
  <LikeButton :id="parseInt($route.params.id, 10)"></LikeButton>
  <p class="likes">{{ post.likes }}</p>
  <input type="text" v-model="comment">
  <button @click="createComment">Comment</button>
  <p v-if="commentSuccessText">{{ commentSuccessText }}</p>
  <div class="comment" v-for="x in post.comments">
    <p>{{ x.comment }}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import converter from '@/converter'
import LikeButton from '@/components/LikeButton.vue'
export default {
  data() {
    return {
      post: {},
      comment: '',
      commentSuccessText: null
    }
  },
  components: {
    LikeButton
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/post/' + this.$route.params.id)
    .then(res => {
      this.$set(this, 'post', res.data.post);
      this.$set(this.post, 'posted', moment(this.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow());
      this.$set(this.post, 'content', converter.makeHtml(this.post.content));
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    createComment() {
      if(this.comment != "") {
        axios.post('http://' + location.hostname + ':3000/create-comment/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey, {
          comment: this.comment
        })
        .then(res => {
          this.$set(this.post, 'comments', res.data.comments);
        })
        .catch(console.log)
      } else {
        this.commentSuccessText = "You need a comment first";
        setTimeout(() => { this.commentSuccessText = null }, 1500);
      }
    }
  }
}
</script>

<style lang="less">

</style>
