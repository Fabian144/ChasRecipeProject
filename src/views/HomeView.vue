<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <FetchError
    v-else-if="errorMessage"
    :error-message="errorMessage"
    :error-status="errorStatus"
  ></FetchError>

  <template v-else>
    <main class="recipe-card-section">
      <RecipeCardSection :recipes="recipes" />
    </main>
  </template>
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
        this.errorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.errorStatus = `${response.status}`;
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      this.loading = false;
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
