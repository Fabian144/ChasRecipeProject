<template>
  <article class="recipe-card">
    <figure class="recipe-image-container">
      <img class="recipe-image" :src="recipeImage" :alt="recipeName" />
    </figure>

    <div class="recipe-info-container">
      <h2 class="recipe-heading">
        {{ recipeName }}
      </h2>

      <div
        class="recipe-star-container"
        :aria-label="`Receptet har ett omdöme på ${Math.round(recipeRating)} av 5 stjärnor`"
      >
        <StarDisplay :rating-value="recipeRating" />
      </div>

      <p class="recipe-description">
        {{ recipeDescription }}
      </p>
    </div>

    <div class="recipe-bottom-container">
      <hr />
      <p class="recipe-bottom-text">
        {{ recipeIngredients.length }} INGREDIENSER | {{ recipeCookingTime }} MINUTER
      </p>
    </div>
  </article>
</template>

<script>
import StarDisplay from '../StarDisplay.vue';

export default {
  props: {
    recipeImage: String,
    recipeName: String,
    recipeDescription: String,
    recipeIngredients: Array,
    recipeCookingTime: Number,
    recipeRating: Number,
  },

  components: {
    StarDisplay,
  },
};
</script>

<style scoped>
.recipe-card {
  background-color: #c3c3c3;
  display: inline-block;
  color: black;
  text-decoration: none;
  max-width: 25em;
}

.recipe-card:active {
  box-shadow: #00000096 1px 1px 10px 1px;
}

.recipe-image-container {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.8em 0.8em 0;
  height: fit-content;
}

.recipe-image {
  border: solid black 4px;
  max-width: 100%;
  max-height: 17em;
  width: 25em;
  object-fit: cover;
}

.recipe-heading {
  font-size: 2em;
  margin: 0;
  width: fit-content;
}

.recipe-star-container {
  margin-top: 0.25em;
  display: flex;
  flex-direction: row;
  width: 9em;
}

.recipe-info-container {
  display: flex;
  flex-direction: column;
  padding: 0.75em 1.25em 0;
}

hr {
  margin: 0 1.25em;
}

.recipe-bottom-container {
  text-align: center;
}

.recipe-bottom-text {
  align-self: center;
  width: fit-content;
  margin: 1em auto;
	font-size: 0.9em;
}

@media (min-width: 526px) {
  .recipe-card:hover {
    box-shadow: #00000096 1px 1px 10px 1px;
  }

  .recipe-image-container {
    align-self: center;
    padding: 1.25em;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .recipe-image {
    width: 18em;
    height: 13em;
  }

  .recipe-heading {
    margin: 0.35em 0 0;
  }

  .recipe-star-container {
    margin-top: 0.25em;
  }

  .recipe-info-container {
    padding: 1em 1em 0;
  }

  hr {
    margin: 0;
  }

  .recipe-bottom-container {
    grid-column-start: 2;
    grid-column-end: 4;
    padding-right: 1em;
  }
}

@media (min-width: 1200px) {
  .recipe-card {
    min-height: 17.5em;
  }
}
</style>
