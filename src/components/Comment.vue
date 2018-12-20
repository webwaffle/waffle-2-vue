<template>
<div>
  <router-link :to="{name: 'user', params: {username: $props.comment.commenter}}">{{ comment.commenter }}</router-link>
  <p v-html="convertedHtml"></p>
  <p class="time">Posted {{ time }}</p>
</div>
</template>

<script>
import moment from 'moment'
import Converter from '@/converter'
export default {
  props: {
    comment: Object
  },
  computed: {
    time() {
      return moment(this.$props.comment.commented, "MM-DD-YYYY h:mm:ss a").fromNow()
    },
    convertedHtml() {
      return Converter.makeHtml(this.$props.comment.comment)
    }
  }
}
</script>

<style scoped lang="less">
div {
  border: 1px solid #011936;
  border-radius: 8px;
  margin: 12px !important;
  * {
    margin: 5px;
  }
  .time {
    color: gray;
    font-size: 10px;
  }
  a {
    font-size: 20px;
    color: black;
    text-decoration: none;
  }
}
</style>
