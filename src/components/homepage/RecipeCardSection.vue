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
    calculateAverage(ratingsArray) {
      if (ratingsArray.length > 0) {
        return (
          ratingsArray.reduce((accumulator, currentValue) => accumulator + currentValue) / ratingsArray.length
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
  margin: 0 0.75em 0.75em;
  width: 100%;
}

.recipe-cards-container > a:focus-visible {
  outline: solid black 2px;
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
  }

  .recipe-cards-container > a {
    width: 100%;
  }
}

@media (min-width: 1400px) {
  .recipe-cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
