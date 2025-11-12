<template>
  <div class="recipe-cards-container">
    <router-link v-for="recipe in recipes" :key="recipe.id" :to="{ name: 'recipe', params: { id: recipe.id } }">
      <RecipeCard
        :recipe-image="recipe.image"
        :recipe-alt-text="recipe.name"
        :recipe-name="recipe.name"
        :recipe-description="recipe.description"
        :recipe-ingredients="recipe.ingredients"
        :recipe-cooking-time="recipe.cooking_time"
        :recipe-rating="recipe.rating.current_stars"
      />
    </router-link>
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
@media (max-width: 767px) {
  .recipe-cards-container {
    max-width: 92.5%;
  }
}
</style>
