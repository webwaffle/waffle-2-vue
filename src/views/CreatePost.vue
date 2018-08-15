<template>
  <div id="create-post">
    <input type="text" v-model="title" placeholder="Post Title"><br>
    <textarea rows="12" cols="80" placeholder="Post Content" v-model="content"></textarea><br>
    <button @click="sendPost">Submit</button>

  </div>
</template>

<script>
import Showdown from 'showdown'
var converter = new Showdown.Converter()
export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    sendPost() {

    }
  }
}
</script>

<style lang="less">

</style>
