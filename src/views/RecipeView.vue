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
    <CommentSection :recipe-id="recipeId" />
  </div>
</template>

<script>
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  components: {
    CommentSection,
  },

  data() {
    return {
      currentRecipe: Array,
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
}

.error-message > a {
  font-size: 1.25em;
}
</style>
