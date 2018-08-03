<template>
<i v-if="liked" class="material-icons LikeButtonLiked">favorite</i>
<i v-else class="material-icons LikeButtonNotLiked">favorite</i>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: Number
  },
  data() {
    return {
      liked: false
    }
  },
  created() { //Get whether or not a post is liked
    axios.get('http://' + location.hostname + ':3000/checkliked/' + this.$props.id)
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
  },
  methods: {
    likePost() {
      axios.put('http://' + location.hostname + ':3000/like/' + this.$props.id + '?key=' + this.$store.state.user.apiKey, {})
      .then(res => {
        if(res.data.success) {
          console.log('liked');
          this.liked = !this.liked
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
