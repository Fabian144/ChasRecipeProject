<template>
  <div class="recipe-cards-container">
    <router-link
      v-for="recipe in recipes"
      :key="recipe.id"
      :to="{ name: 'theRecipe', params: { recipeId: recipe.id } }"
      :aria-label="`Länk till ${recipe.title} receptet`"
    >
      <RecipeCard
        :recipe-image="recipe.imageUrl"
        :recipe-name="recipe.title"
        :recipe-description="recipe.description"
        :recipe-ingredients="recipe.ingredients"
        :recipe-cooking-time="recipe.timeInMins"
        :recipe-rating="recipe.ratings.length > 0 ? calculateAverageRating(recipe.ratings) : 0"
      />
    </router-link>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
  components: {
    RecipeCard,
  },

  props: ['recipes'],

  methods: {
    calculateAverageRating(ratings) {
      return (
        ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
        ratings.length
      );
    },
  },
};
</script>

<style scoped>
.recipe-cards-container {
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  margin: 0 0.75em 0.75em;
  width: 100%;
  align-items: center;
}

.recipe-cards-container > a:focus-visible {
  outline: solid black 2px;
}

@media (min-width: 526px) {
  .recipe-cards-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
