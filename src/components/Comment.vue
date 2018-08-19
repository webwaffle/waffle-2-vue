<template>
<div>
  <h3>{{ comment.commenter }}</h3>
  <p>{{ comment.comment }}</p>
  <p class="time">Posted {{ time }}</p>
</div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    comment: Object
  },
  computed: {
    time() {
      return moment(this.$props.comment.commented, "MM-DD-YYYY h:mm:ss a").fromNow()
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
}
</style>
