<template>
  <div class="recipe-cards-container">
    <router-link
      v-for="recipe in recipes"
      :key="recipe.id"
      :to="{ name: 'theRecipe', params: { recipeId: recipe.id } }"
      :aria-label="`Länk till ${recipe.title} receptet`"
    >
      <RecipeCard
        :recipe-alt-text="recipe.title"
        :recipe-name="recipe.title"
        :recipe-description="recipe.description"
        :recipe-ingredients="recipe.ingredients"
        :recipe-cooking-time="recipe.timeInMins"
        :recipe-rating="recipe.ratings"
      />
    </router-link>
  </div>
</template>

<script>
import { fetchAllRecipes } from '../../modules/fetchRecipeData.js';
import RecipeCard from './RecipeCard.vue';

export default {
  async mounted() {
    this.recipes = await fetchAllRecipes();
  },

  data() {
    return {
      recipes: Array,
    };
  },

  components: {
    RecipeCard,
  },
};
</script>

<style scoped>
.recipe-cards-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0 1em 1em;
}

.recipe-cards-container > a:focus {
  outline: solid black 2px;
}

@media (max-width: 768px) {
  .recipe-cards-container {
    margin: 0 auto 1em;
    max-width: 92.5%;
  }
}
</style>
