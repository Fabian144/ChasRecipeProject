<template>
  <div v-if="error" class="error-message">
    <h1>
      Receptet kunde inte laddas in eller hittas inte <br />
      Status: {{ error }}
    </h1>
    <a href="/">Tillbaka till startsidan</a>
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
    <RatingSection :recipe-id="recipeId" />
    <CommentSection />
  </div>
</template>

<script>
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  components: {
    CommentSection,
    RatingSection,
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
        `REMOVED/REMOVED/recipes/${this.recipeId}`,
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
