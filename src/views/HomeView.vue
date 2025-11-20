<template>
  <div v-if="error" class="error-message">{{ error }}</div>

  <div class="loading-container" v-if="loading">
    <img src="../images/e50c7e38-b24e-4fbd-a400-516909b77df5.png" alt="Julgran" class="loading" />
  </div>

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
      loading: true,
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
        this.loading = false;
        this.error = `Misslyckades att ladda in recept: Status ${response.status}`;
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
      this.loading = false;
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
