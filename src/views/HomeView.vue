<template>
  <div v-if="error" class="error-message">{{ error }}</div>

  <main v-else class="recipe-card-section">
    <RecipeCardSection :recipes="recipes" />
  </main>
</template>

<script>
import RecipeCardSection from '../components/homepage/RecipeCardSection.vue';

export default {
  data() {
    return {
      recipes: Array,
      error: '',
    };
  },

  components: {
    RecipeCardSection,
  },

  async mounted() {
    try {
      const response = await fetch(
        'REMOVED/REMOVED/recipes',
      );
      if (!response.ok) {
        this.error = `Misslyckades att ladda in recept: Status ${response.status}`;
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  },
};
</script>

<style scoped>
.recipe-card-section {
  display: flex;
  height: 100dvh;
}

.error-message {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: rgb(77, 77, 77);
}
</style>
