<template>
  <div id="app">
    <router-view></router-view>

    <!-- Kommentar-sektionen -->
    <CommentSection />
  </div>
</template>

<script>
import CommentSection from './components/recipepage/commentSection.vue';

export default {
  components: {
    CommentSection,
  },
};
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
}
</style>
