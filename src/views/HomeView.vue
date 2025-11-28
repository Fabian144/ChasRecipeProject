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
      errorMessage: '',
      errorStatus: '',
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        'REMOVED/REMOVED/recipes',
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
    } catch (error) {
      this.errorMessage = `Recepten kunde inte laddas in eller hittas inte`;
      this.errorStatus = `${error.message}`;
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
