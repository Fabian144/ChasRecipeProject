<template>
  <RecipeCard
    v-for="recipe in recipes"
    :recipe-image="recipe.image"
    :recipe-name="recipe.name"
    :recipe-alt-text="recipe.alt_text"
    :recipe-description="recipe.description"
    :recipe-ingredients="recipe.ingredients"
    :recipe-cooking-time="recipe.cooking_time"
    :recipe-rating="recipe.rating.current_stars"
  />
</template>

<script>
import recipes from '../../modules/fetchRecipeData.js';
import RecipeCard from './RecipeCard.vue';

export default {
  data() {
    return {
      recipes,
    };
  },

  components: {
    RecipeCard,
  },
};
</script>

<style scoped></style>
