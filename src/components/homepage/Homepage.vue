<template>
  <main class="recipe-card-section">
    <RecipeCardSection />
  </main>
</template>

<script>
import RecipeCardSection from './RecipeCardSection.vue';

export default {
  components: {
    RecipeCardSection,
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .recipe-card-section {
    display: flex;
		width: 20em;
  }
}
</style>
