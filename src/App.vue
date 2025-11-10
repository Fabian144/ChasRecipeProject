<template>
  <router-view></router-view>
</template>

<script>
import HomeView from './views/HomeView.vue';
import RecipeView from './views/RecipeView.vue';

export default {
  components: {
    HomeView,
    RecipeView,
  },
};
</script>

<style scoped></style>
