<template>
    <div id="user" v-if="user">
        <p id="id">User ID #{{ user.id }}</p>
        <h1 id="username">{{ user.username }}</h1>
        <p id="created">Account created {{ user.created }}</p>
        <PostCard v-for="post in posts" :key="post.id" :post="post" v-if="posts"></PostCard>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import PostCard from '@/components/PostCard.vue'
//console.log(PostCard)
export default {
    data() {
        return {
            user: null,
            posts: null
        }
    },
    components: { PostCard },
    created() {
        axios.get('__API_ROOT__' + '/user/' + this.$route.params.username)
        .then((res) => {
            var user = res.data.user;
            user.created = moment(res.data.user.created, "MM-DD-YY h:mm:ss a").fromNow();
            this.user = user;
        })
        .catch(console.log);

        //console.log('__API_ROOT__' + '/posts')
        axios.get('__API_ROOT__' + '/posts')
        .then((res) => {
            var posts = res.data.posts.filter(x => x.poster == this.$route.params.username);
            for (var i = 0; i < posts.length; i++) {
                posts[i].intTime = moment(posts[i].posted, "MM-DD-YY h:mm:ss a").valueOf();
            }
            posts.sort((a, b) => {
                return b.intTime - a.intTime;
            })
            this.posts = posts;
        })
        .catch(console.log);
    }
}
</script>

<style lang="less">

</style>
