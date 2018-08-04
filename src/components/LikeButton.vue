<template>
<i v-if="likedInData" class="material-icons LikeButtonLiked" @click="likePost">favorite</i>
<i v-else class="material-icons LikeButtonNotLiked" @click="likePost">favorite</i>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: Number,
    liked: Boolean
  },
  data() {
    return {
      likedInData: false
    }
  },
  /*created() { //Get whether or not a post is liked
    console.log(this.$props.id)
    axios.get('http://' + location.hostname + ':3000/checkliked/' + this.$props.id + '?key=' + this.$store.state.user.apiKey)
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
  },*/
  watch: {
    liked(newVal, oldVal) {
      this.likedInData = newVal
    }
  },
  methods: {
    likePost() {
      axios.put('http://' + location.hostname + ':3000/like/' + this.$props.id + '?key=' + this.$store.state.user.apiKey, {})
      .then(res => {
        if(res.data.success) {
          console.log('liked');
          this.likedInData = !this.likedInData
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
  color: #E83F6F;
}
.LikeButtonNotLiked {

}
</style>
