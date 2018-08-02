<template>
  <div class="PostCard animated bounceInDown">
    <h1>{{ $props.post.title }}</h1>
    <p class="author">By {{ $props.post.poster }}</p>
    <p class="posted">{{ relativeTime }}</p>
    <p class="content">{{ $props.post.content }}</p>
  </div>
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
div.PostCard {
  float: left;
  margin: 8px;
  padding: 5px;
  width: 300px;
  height: 200px;
  box-shadow: 0px 0px 10px gray;
}
</style>
