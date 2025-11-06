<template>
  <div class="recipe-cards-container">
    <RecipeCard
      v-for="recipe in recipes"
      :recipe-image="recipe.image"
      :recipe-alt-text="recipe.alt_text"
      :recipe-name="recipe.name"
      :recipe-description="recipe.description"
      :recipe-ingredients="recipe.ingredients"
      :recipe-cooking-time="recipe.cooking_time"
      :recipe-rating="recipe.rating.current_stars"
    />
  </div>
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

<style scoped>
.recipe-cards-container {
  width: fit-content;
}
</style>
