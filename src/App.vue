

<template>
  <div id="app">
    <router-view></router-view>

    <!-- Kommentar-sektionen -->
    <CommentSection />
  </div>
</template>


<script setup>
import CommentSection from '../components/recipepage/CommentSection.vue'
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
	margin: 0;
}
</style>