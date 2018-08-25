<template>
<p v-if="error">{{ error }}</p>
<div id="chat" v-else>
  <h1>{{ chat.name }}</h1>
  <div class="message" v-for="message in chat.messages">
    <p class="text mine" v-if="message.from == $store.state.user.username">{{ message.message }}</p>
    <p class="text notmine" v-else>{{ message.message }}</p><br>
    <p class="sender" v-if="message.from != $store.state.user.username">{{ message.from }}</p>
    <br><br>
  </div>
  <input type="text" placeholder="Message" v-model="message">
  <button @click="sendMessage">Send</button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Chat',
  data() {
    return {
      chat: {},
      message: '',
      error: null,
      sendError: null
    }
  },
  created() {
    axios.get('http://' + location.hostname + ':3000/chat-info/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey)
    .then((res) => {
      if(res.data.success) {
        this.chat = res.data.chat
      } else {
        this.error = 'You don\'t have access to this chat.'
      }
    })
    .catch(console.log)
  },
  methods: {
    sendMessage() {
      axios.post('http://' + location.hostname + '/')
    }
  }
}
</script>

<style lang="less">
#chat {
  .message {
    .sender {
      color: gray;
      font-size: 15px;
    }
    .text {
      margin: 2px;
      padding: 5px;
      border-radius: 3px;
      &.mine {
        float: right;
        background-color: #011936;
        color: white;
      }
      &.notmine {
        float: left;
        background-color: gray;
      }
    }
  }
}
</style>
