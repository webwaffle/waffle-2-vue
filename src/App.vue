<template>
  <div id="app">
    <Sidebar></Sidebar>
    <div id="main">
        <router-view />
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  export default {
    components: { Sidebar }
  }
</script>

<style lang="less">
//https://coolors.co/2b2d42-004ba8-ff6700-011936-e83f6f
//Global styles
body {
  margin: 0;
}
* {
  font-family: 'Raleway', sans-serif;
}
.mono {
  font-family: 'Inconsolata', monospace;
}
.error {
  background-color: #ff6700;
  color: white;
  padding: 3px;
  margin: 3px;
  border-radius: 3px;
}
#main {
  margin-left: 300px;
}
</style>
