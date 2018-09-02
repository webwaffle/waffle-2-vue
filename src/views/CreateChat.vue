<template>
  <div id="create-chat">
    <h1>Create a chat</h1>
    <input type="text" placeholder="Chat name" v-model="chatName">
    <button @click="createChat">Create</button>
    <p v-html="messageText"></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => { return {
    chatName: '',
    messageText: null
  }},
  methods: {
    createChat() {
      axios.post(location.protocol + '//' + location.hostname + ':3000/create-chat?key=' + this.$store.state.user.apiKey, {
        name: this.chatName
      })
      .then(res => {
        if(res.data.success) {
          this.messageText = 'Created';
          setTimeout(() => { this.$router.push('/') }, 1500);
        } else {
          this.messageText = res.data.error;
          setTimeout(() => { this.messageText = null }, 1500);
        }
      })
      .catch(console.log)
    }
  }
}
</script>

<style lang="less">
</style>
