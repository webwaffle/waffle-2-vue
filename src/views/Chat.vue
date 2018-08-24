<template>

</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      chat: {},
      message: ''
    }
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/chat-info/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey)
    .then((res) => {
      
    })
    .catch(console.log)
  }
}
</script>

<style lang="less">
</style>
