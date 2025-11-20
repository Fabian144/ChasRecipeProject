<template>
  <div v-if="error" class="error-message">Misslyckades med att ladda in recepten <br> Status: {{ error }}</div>

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
        'https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes',
      );
      if (!response.ok) {
        this.loading = false;
        this.error = `${response.status}`;
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
	text-align: center;
}
</style>
