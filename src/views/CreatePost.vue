<template>
  <div id="create-post">
    <input type="text" v-model="title" placeholder="Post Title"><br>
    <textarea rows="12" cols="80" placeholder="Post Content" v-model="content" @input="updateMarkdown"></textarea><br>
    <button @click="sendPost">Submit</button>
    <p v-if="successText">{{ successText }}</p>
    <p>To add emojis, please use <a href="https://github.com/showdownjs/showdown/wiki/emojis" target="_blank">this</a> emoji list.</p>
    <p>Result:</p>
    <div v-html="renderedHtml"></div>
  </div>
</template>

<script>
import Showdown from 'showdown'
import axios from 'axios'
var converter = new Showdown.Converter({ emoji: true, noHeaderId: true })
export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      content: '',
      renderedHtml: '',
      successText: null
    }
  },
  methods: {
    sendPost() {
      if(this.title != '' && this.content != '') {
        axios.post('http://' + location.hostname + ':3000/create-post?key=' + this.$store.state.user.apiKey, {title: this.title, content: this.content})
        .then((res) => {
          if(res.data.success) {
            this.successText = "Post Created!";
            this.title = "";
            this.content = "";
            this.renderedHtml = "";
            setTimeout(() => { this.$router.push({ name: 'home' }) }, 1000)
          }
        })
        .catch((error) => { console.log(error) })
      } else {
        this.successText = "You must have a title and content."
        setTimeout(() => { this.successText = null; }, 1500)
      }
    },
    updateMarkdown() {
      this.renderedHtml = converter.makeHtml(this.content)
    }
  }
}
</script>

<style lang="less">

</style>
