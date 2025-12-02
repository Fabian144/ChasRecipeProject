<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  ></GetMethodError>

  <template v-else>
    <Header></Header>
    <main class="recipe-card-section">
      <RecipeCardSection :recipes="recipes" />
    </main>
  </template>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import GetMethodError from '@/components/GetMethodError.vue';
import Header from '@/components/homepage/Header.vue';
import RecipeCardSection from '@/components/homepage/RecipeCardSection.vue';

export default {
  components: {
    LoadingIcon,
    GetMethodError,
    Header,
    RecipeCardSection,
  },

  data() {
    return {
      recipes: [],
      loading: true,
      fetchErrorMessage: '',
      fetchErrorStatus: '',
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
      this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
      this.fetchErrorStatus = `${error.message}`;
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
