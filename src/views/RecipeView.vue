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
    setInterval(() => {
      this.recipes = recipes;
    }, 5000);
  },

  components: {
    RatingSection,
    CommentSection,
  },
};
</script>

<style scoped></style>
