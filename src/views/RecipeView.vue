<template>
  <div v-if="error" class="error-message">
    <h1>
      Receptet kunde inte laddas in eller hittas inte <br />
      Status: {{ error }}
    </h1>
    <a href="/">Tillbaka till startsidan</a>
  </div>

  <LoadingIcon v-if="loading"></LoadingIcon>

  <div v-else>
    <RatingSection :recipe-id="recipeId" />
    <CommentSection />
  </div>
</template>

<script>
import LoadingIcon from '../components/LoadingIcon.vue';
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  components: {
    CommentSection,
    RatingSection,
    LoadingIcon,
  },

  data() {
    return {
      currentRecipe: [],
      error: false,
      loading: true,
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
        `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes/${this.recipeId}`,
      );
      if (!response.ok) {
        this.loading = false;
        this.error = `${response.status}`;
        throw new Error(`Status: ${response.status}`);
      }
      this.currentRecipe = await response.json();
      this.loading = false;
    } catch (error) {
      console.error('Fetch failed:', error);
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
