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
#main {
  margin-left: 150px;
}
</style>
