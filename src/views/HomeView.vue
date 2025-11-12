<template>
  <main class="recipe-card-section">
    <RecipeCardSection />
  </main>
</template>

<script>
import RecipeCardSection from '../components/homepage/RecipeCardSection.vue';

export default {
  components: {
    RecipeCardSection,
  },
};
</script>

<style scoped>
.recipe-card-section {
  display: flex;
}
</style>
