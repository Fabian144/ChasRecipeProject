<template>
  <FetchError
    v-if="errorMessage"
    :error-message="errorMessage"
    :error-status="errorStatus"
  ></FetchError>

  <LoadingIcon v-if="loading"></LoadingIcon>

  <div v-else>
    <main class="recipe-card-section">
      <RecipeCardSection :recipes="recipes" />
    </main>
  </div>
</template>

<script>
import LoadingIcon from '../components/LoadingIcon.vue';
import FetchError from '../components/FetchError.vue';
import RecipeCardSection from '../components/homepage/RecipeCardSection.vue';

export default {
  components: {
    LoadingIcon,
    FetchError,
    RecipeCardSection,
  },

  data() {
    return {
      recipes: [],
      loading: true,
      errorMessage: false,
      errorStatus: false,
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        'https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes',
      );
      if (!response.ok) {
        this.loading = false;
        this.errorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.errorStatus = `${response.status}`;
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
</style>
