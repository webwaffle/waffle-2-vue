<template>
<div class="PostById animated bounceInDown">
  <h1>{{ post.title }}</h1>
  <p class="time">{{ post.posted }}</p>
  <router-link :to="{name: 'user', params: {username: post.poster}}" class="author">By {{ post.poster }}</router-link>
  <p class="content" v-html="post.content"></p>
  <LikeButton :id="parseInt($route.params.id, 10)"></LikeButton>
  <textarea col="50" rows="5" v-model="comment" @input="updateHtml"></textarea><br>
  <button @click="createComment">Comment</button>
  <p>Result:</p>
  <div v-html="commentHtml"></div>
  <p v-if="commentSuccessText">{{ commentSuccessText }}</p>
  <Comment v-for="x in post.comments" :comment="x" :key="x.comment"></Comment>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import converter from '@/converter'
import LikeButton from '@/components/LikeButton.vue'
import Comment from '@/components/Comment.vue'
import Converter from '@/converter'
export default {
  data() {
    return {
      post: {},
      comment: '',
      commentHtml: '',
      commentSuccessText: null
    }
  },
  components: {
    LikeButton,
    Comment
  },
  created() {
    axios.get('__API_ROOT__' + '/post/' + this.$route.params.id)
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
        axios.post('__API_ROOT__' + '/create-comment/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey, {
          comment: this.comment
        })
        .then(res => {
          this.$set(this.post, 'comments', res.data.comments);
        })
        .catch(console.log);
        this.comment = '';
      } else {
        this.commentSuccessText = "You need a comment first";
        setTimeout(() => { this.commentSuccessText = null }, 1500);
      }
    },
    updateHtml() {
      this.commentHtml = converter.makeHtml(this.comment)
    }
  }
}
</script>

<style lang="less">
.author {
  text-decoration: none;
  color: black;
}
</style>
