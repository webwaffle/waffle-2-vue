<template>
  <router-link :to="{name: 'postById', params: {id: $props.post.id}}">
  <div class="PostCard animated bounceInDown">
    <h1>{{ $props.post.title }}</h1>
    <p class="author">By {{ $props.post.poster }}</p>
    <p class="posted">{{ relativeTime }}</p>
    <p class="content">{{ $props.post.content }}</p>
  </div>
</router-link>
</template>

<script>
import moment from 'moment'
export default {
  name: "PostCard",
  props: {
    post: Object
  },
  computed: {
    relativeTime() {
      return moment(this.$props.post.posted, "MM-DD-YYYY h:mm:ss a").fromNow();
    }
  }
}
</script>

<style lang="less">
.PostCard {
  float: left;
  margin: 8px;
  padding: 5px;
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
