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
        :recipe-average-rating="calculateAverage(recipe.ratings)"
        :amount-of-ratings="recipe.ratings.length"
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

  props: {
    recipes: Array,
  },

  methods: {
    calculateAverage(arrayWithAllRatings) {
      if (arrayWithAllRatings.length > 0) {
        return (
          arrayWithAllRatings.reduce((accumulator, currentValue) => accumulator + currentValue) /
          arrayWithAllRatings.length
        );
      } else {
        return 0;
      }
    },
  },
};
</script>

<style scoped>
.recipe-cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75em;
  margin: 0.25em 1.2em 0 1em;
  width: 100%;
}

@media (min-width: 526px) {
  .recipe-cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) {
  .recipe-cards-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
  }

  .recipe-cards-container > a {
    width: 100%;
  }
}

@media (min-width: 1400px) {
  .recipe-cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75em;
  }
}

@media (min-width: 2600px) {
  .recipe-cards-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 3200px) {
  .recipe-cards-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
