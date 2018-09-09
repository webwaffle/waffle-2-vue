<template>
  <div class="PostCard animated bounceInDown">
    <router-link :to="{name: 'postById', params: {id: $props.post.id}}">
      <h1 class="title">{{ $props.post.title }}</h1>
    </router-link>
    <p class="author">By {{ $props.post.poster }}</p>
    <p class="posted">{{ relativeTime }}</p>
    <LikeButton :id="$props.post.id"></LikeButton>
    
    <p class="comments">{{ post.comments.length }} comments</p>
  </div>
</template>

<script>
import moment from 'moment'
import LikeButton from '@/components/LikeButton.vue'
import axios from 'axios'
export default {
  name: "PostCard",
  props: {
    post: Object
  },
  computed: {
    relativeTime() {
      return moment(this.$props.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow();
    }
  },
  components: { LikeButton },
  data() {
    return {

    }
  }/*,
  created() {
    axios.get('__API_ROOT__' + '/checkliked/' + this.props.id + '?key=' + this.$store.state.user.apiKey)
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
  }*/
}
</script>

<style lang="less">
.PostCard {
  float: left;
  margin: 8px;
  padding: 12px;
  width: 300px;
  height: 200px;
  box-shadow: 0px 0px 10px gray;
  border-radius: 10px;
  transition: all .20s;
  * {
    text-decoration: none;
    color: black;
  }
  h1 {
    text-decoration: underline;
  }
  &:hover {
    box-shadow: 0px 0px 30px gray;
    transition: all .5s;
  }
}


</style>
