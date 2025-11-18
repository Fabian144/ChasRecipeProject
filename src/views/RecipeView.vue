<template>
  <RatingSection @chosenRatingChanged="(theRating) => (chosenRating = theRating)" />
  <CommentSection />
</template>

<script>
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';
import recipes from '@/modules/fetchRecipeData';

export default {
  data() {
    return {
      chosenRating: 0,
      recipes: recipes,
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },

    currentRecipe() {
      return this.recipes.filter((recipe) => recipe.id === this.recipeId)[0];
    },
  },

  mounted() {
    setInterval(async () => {
      try {
        const response = await fetch(`/src/data/recept.json`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        this.recipes = data.recipes;
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    }, 5000);
  },

  components: {
    RatingSection,
    CommentSection,
  },
};
</script>

<style scoped></style>
