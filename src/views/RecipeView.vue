<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <FetchRecipesError
    v-else-if="errorMessage"
    :error-message="errorMessage"
    :error-status="errorStatus"
  ></FetchRecipesError>

  <template v-else>
    <RatingSection :recipe-id="recipeId" />
    <CommentSection />
  </template>
</template>

<script>
import LoadingIcon from '../components/LoadingIcon.vue';
import FetchRecipesError from '../components/FetchRecipesError.vue';
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  components: {
    LoadingIcon,
    FetchRecipesError,
    CommentSection,
    RatingSection,
  },

  data() {
    return {
      currentRecipe: [],
      loading: true,
      errorMessage: '',
      errorStatus: '',
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },
  },

  async mounted() {
    try {
      const response = await fetch(
        `REMOVED/REMOVED/recipes/${this.recipeId}`,
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      this.currentRecipe = await response.json();
    } catch (error) {
      this.errorMessage = 'Receptet kunde inte laddas in eller hittas inte';
      this.errorStatus = `${error.message}`;
      console.error('Fetch failed:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
</style>
