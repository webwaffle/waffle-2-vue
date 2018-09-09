<template>
<a>
  <div class="LikeButton">
    <i v-if="liked" class="material-icons LikeButtonLiked" @click="likePost">favorite</i>
    <i v-else class="material-icons LikeButtonNotLiked" @click="likePost">favorite</i>
    <p class="likes">{{ likes }}</p>
  </div>
</a>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: Number
  },
  data() {
    return {
      liked: false,
      likes: 0
    }
  },
  created() { //Get whether or not a post is liked
    //console.log(this.$props.id)
    axios.get('__API_ROOT__' + '/checkliked/' + this.$props.id + '?key=' + this.$store.state.user.apiKey)
    .then(res => {
      if(res.data.success) {
        this.$set(this, 'liked', res.data.liked)
        this.$set(this, 'likes', res.data.likes)
      } else {
        console.log(res)
      }
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    likePost() {
      axios.put('__API_ROOT__' + '/like/' + this.$props.id + '?key=' + this.$store.state.user.apiKey, {})
      .then(res => {
        if(res.data.success) {
          console.log('liked');
          this.liked = !this.liked
          if(this.liked) {
            this.likes++;
          } else {
            this.likes--;
          }
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
.LikeButtonLiked {
  color: #E83F6F !important;
}
.LikeButtonNotLiked {

}
.likes {
  margin: 0;
  display: inline;
}
</style>
