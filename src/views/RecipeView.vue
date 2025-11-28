<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <FetchError
    v-else-if="errorMessage"
    :error-message="errorMessage"
    :error-status="errorStatus"
  ></FetchError>

  <template v-else>
    <RatingSection :recipe-id="recipeId" />
    <CommentSection />
  </template>
</template>

<script>
import LoadingIcon from '../components/LoadingIcon.vue';
import FetchError from '../components/FetchError.vue';
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  components: {
    LoadingIcon,
    FetchError,
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
.error-message {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.error-message > a {
  font-size: 1.25em;
  color: white;
}
</style>
