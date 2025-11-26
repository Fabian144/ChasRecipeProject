<template>
  <div v-if="error" class="error-message">
    <h1>
      Recepten kunde inte laddas in eller hittas inte <br />
      Status: {{ error }}
    </h1>
  </div>

  <div class="loading-container" v-if="loading">
    <img
      src="../images/e50c7e38-b24e-4fbd-a400-516909b77df5.png"
      alt="Julgran"
      class="loading-icon"
    />
    <p class="loading-text">Laddar...</p>
  </div>

  <div v-else>
    <main class="recipe-card-section">
      <RecipeCardSection :recipes="recipes" />
    </main>
  </div>
</template>

<script>
import RecipeCardSection from '../components/homepage/RecipeCardSection.vue';

export default {
  components: {
    RecipeCardSection,
  },

  data() {
    return {
      recipes: [],
      error: false,
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
  text-align: center;
  color: white;
}
</style>
