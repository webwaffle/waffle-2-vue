<template>
    <div id="home">
      <input type="text" v-model="search" @input="searchPosts" id="searchBar" placeholder="Search" v-if="checkLoggedIn">
      <br><br><br><br>
      <Login v-if="!checkLoggedIn"></Login>
      <div v-else>
        <PostCard v-for="post in posts.slice().reverse()" :key="post.id" :post="post"></PostCard>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Login from '@/components/Login.vue'
import PostCard from '@/components/PostCard.vue'
export default {
    name: 'Home',
    data() {
        return {
            posts: [],
            search: ''
        }
    },
    components: {
      Login,
      PostCard
    },
    computed: {
      checkLoggedIn() {
        return !!this.$store.state.user.username
      }
    },
    created() {
      axios.get('__API_ROOT__' + '/posts')
      .then((res) => {
        //console.log(res)
        if(res.data.success) {
          this.posts = res.data.posts
        } else {
          console.log(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    methods: {
      searchPosts() {
        if(this.search != '') {
          this.posts = this.posts.filter(x => x.title.includes(this.search))
        }
      }
    }
}
</script>

<style lang="less">
#searchBar {
  width: 100%;
  height: 40px;
  position: fixed;
  top: 0;
  right: 0;
  left: 300px;
}
</style>
