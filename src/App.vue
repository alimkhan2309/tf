<template>
  <router-view/>
  <Navbar/>
</template>
<script>

import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #w;
}


</style>
