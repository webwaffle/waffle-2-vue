<template>
  <div class="PostCard">
    <h1>{{ $props.post.title }}</h1>
    <p>{{ $props.post.content }}</p>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: Object
  },

}
</script>

<style lang="less">

</style>
