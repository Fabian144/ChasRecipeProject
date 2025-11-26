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
  display: inline-grid;
  color: black;
  text-decoration: none;
}

.recipe-card:active {
  box-shadow: #00000096 1px 1px 10px 1px;
}

.recipe-image-container {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0.5em 0;
  max-height: 17em;
}

.recipe-image {
  border: solid black 4px;
  width: 100%;
  object-fit: cover;
}

.recipe-heading {
  font-size: 1.6em;
  margin: 0;
  width: fit-content;
}

.recipe-star-container {
  margin-top: 0.25em;
  display: flex;
  flex-direction: row;
  width: 8em;
}

.recipe-info-container {
  display: flex;
  flex-direction: column;
  padding: 0.75em 1.25em 0;
}

.recipe-description {
  font-size: 0.9em;
}

hr {
  margin: 0 1.25em;
}

.recipe-bottom-container {
  text-align: center;
  margin-top: auto;
}

.recipe-bottom-text {
  align-self: center;
  width: fit-content;
  margin: 1em auto;
  font-size: 0.9em;
}

@media (min-width: 526px) {
  .recipe-card {
    min-height: 25em;
    width: 100%;
  }

  .recipe-image-container {
    max-height: 12em;
  }
}

@media (min-width: 768px) {
  .recipe-card {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    min-height: unset;
    max-width: unset;
  }

  .recipe-card:hover {
    box-shadow: #00000096 1px 1px 10px 1px;
  }

  .recipe-image-container {
    aspect-ratio: 16/11;
    max-height: unset;
    width: 38vw;
    max-width: 20em;
    align-self: center;
    padding: 1.25em;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .recipe-image {
    max-width: 100%;
  }

  .recipe-heading {
    margin: 0.35em 0 0;
  }

  .recipe-info-container {
    padding: 1em 1em 0 0;
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

@media (min-width: 1400px) {
  .recipe-card {
    min-height: 15em;
  }

  .recipe-image-container {
    width: 20vw;
  }
}

@media (min-width: 1600px) {
  .recipe-card {
    min-height: 17em;
  }

  .recipe-heading {
    font-size: 1.9em;
  }

  .recipe-star-container {
    width: 9em;
  }

  .recipe-description {
    font-size: 1em;
  }
}
</style>
