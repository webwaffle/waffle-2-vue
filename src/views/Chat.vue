<template>
<p v-if="error">{{ error }}</p>
<div id="chat" v-else>
  <h1>{{ chat.name }}</h1>
  <div id="invite" v-if="chat.creator == $store.state.user.username">
    <h3>Invite someone</h3>
    <input type="text" placeholder="Username" v-model="toInvite">
    <button @click="inviteUser">Invite</button>
    <p v-html="inviteError" v-if="inviteError"></p>
  </div>
  <div class="message" v-for="message in chat.messages">
    <p class="text mine" v-if="message.from == $store.state.user.username">{{ message.message }}</p>
    <p class="text notmine" v-else>{{ message.message }}</p><br>
    <p class="sender" v-if="message.from != $store.state.user.username">{{ message.from }}</p>
    <br><br>
  </div>
  <div id="message-box">
    <input type="text" placeholder="Message" v-model="message">
    <button @click="sendMessage">Send</button>
    <p v-if="sendError" v-html="sendError"></p>
  </div>
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
      sendError: null,
      inviteError: null,
      toInvite: '',
      interval: null
    }
  },
  created() {
    axios.get('__API_ROOT__' + '/chat-info/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey)
    .then((res) => {
      if(res.data.success) {
        this.chat = res.data.chat
        this.interval = setInterval(() => { this.getMessages() }, 2000)
      } else {
        this.error = 'You don\'t have access to this chat.'
      }
    })
    .catch(console.log)
  },
  methods: {
    sendMessage() {
      axios.post('__API_ROOT__' + '/chat-message/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey, {
        message: this.message
      })
      .then(res => {
        if(res.data.success) {
          this.message = '';
          this.sendError = '<i class="material-icons">check</i>Successfully sent message';
          setTimeout(() => { this.sendError = null }, 1500);
        }
      })
      .catch(console.log)
    },
    getMessages() {
      axios.get('__API_ROOT__' + '/chat-info/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey)
      .then((res) => {
        if(res.data.success) {
          this.chat = res.data.chat
        } else {
          this.error = 'You don\'t have access to this chat.'
        }
      })
      .catch(console.log)
    },
    inviteUser() {
      axios.post('__API_ROOT__' + '/chat-invite/' + this.$route.params.id + '?key=' + this.$store.state.user.apiKey, {
        username: this.toInvite
      })
      .then(res => {
        if(res.data.success) {
          this.inviteError = '<i class="material-icons">check</i>Successfully invited user ' + this.toInvite;
          this.toInvite = '';
          setTimeout(() => { this.inviteError = null }, 1500);
        } else {
          this.inviteError = '<i class="material-icons">error</i>Already a member';
          this.toInvite = '';
          setTimeout(() => { this.inviteError = null }, 1500);
        }
      })
      .catch(console.log)
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
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
  #message-box {
    width: 100%;
    border-top: 1px solid #011936;
    bottom: 0;
    right: 0;
    position: fixed;
    left: 300px;
  }
}
</style>
