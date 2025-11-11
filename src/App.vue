<!-- <template>
  <router-view></router-view>
   <CommentSection />
</template>


<script>
import CommentSection from '/components/ recipepage/CommentSection.vue'

</script>

<style scoped></style> -->

<template>
  <div id="app">
    <!-- Om du använder Vue Router -->
    <router-view></router-view>

    <!-- Kommentar-sektionen -->
    <CommentSection />
  </div>
</template>

<script setup>
import CommentSection from './components/recipepage/CommentSection.vue'


</script>

<style scoped>
/* Du kan lägga global styling här om du vill */
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
  background-color: #fdfdfd;
}
</style>




