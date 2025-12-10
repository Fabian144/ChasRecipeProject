<template>
  <article class="recipe-card">
    <figure class="recipe-image-container">
      <img class="recipe-image" :src="recipeImage" :alt="recipeName" />
    </figure>

    <div class="recipe-info-container">
      <h3 class="recipe-heading">
        {{ recipeName }}
      </h3>

      <ul
        class="recipe-rating-container"
        :aria-label="`Receptet har ett omdöme på ${roundedRecipeAverageRating} av 5 stjärnor`"
      >
        <li class="recipe-star-container">
          <StarDisplay :value-to-display="roundedRecipeAverageRating" />
        </li>
        <li
          class="recipe-rating-amount"
          :aria-label="`Receptet har ${roundedRecipeAverageRating} röster`"
        >
          ({{ amountOfRatings }})
        </li>
      </ul>

      <p class="recipe-description">
        {{ recipeDescription }}
      </p>
    </div>

    <div class="card-bottom-container">
      <hr />
      <p class="bottom-section-text">
        {{ amountOfIngredients }} {{ ingredientsText }} | {{ recipeCookingTime }} MINUTER
      </p>
    </div>
  </article>
</template>

<script>
import StarDisplay from '../StarDisplay.vue';

export default {
  components: { StarDisplay },

  props: {
    recipeImage: String,
    recipeName: String,
    recipeDescription: String,
    recipeIngredients: Array,
    recipeCookingTime: Number,
    recipeAverageRating: Number,
    amountOfRatings: Number,
  },

  computed: {
    roundedRecipeAverageRating() {
      return Math.round(this.recipeAverageRating);
    },

    amountOfIngredients() {
      return this.recipeIngredients.length;
    },

    ingredientsText() {
      return this.recipeIngredients.length === 1 ? 'INGREDIENS' : 'INGREDIENSER';
    },
  },
};
</script>

<style scoped>
.recipe-card {
  display: inline-grid;
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  background-color: rgba(68, 133, 56, 0.9);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 2px 1.5px rgba(0, 0, 0, 0.5) inset;
  border: solid black 3px;
  border-radius: 7px;
  transition: all 100ms;
}

.recipe-card:active {
  box-shadow: 2px 2px 5px black;
}

.recipe-image-container {
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: 17em;
  height: 60vw;
  box-shadow: 0 0 4px 1.5px rgba(0, 0, 0, 0.5);
}

.recipe-image {
  border-bottom: solid black 3px;
  border-radius: 5px 5px 0 0;
  width: 100%;
  object-fit: cover;
}

.recipe-heading {
  font-size: 1.6em;
  margin: 0;
  width: fit-content;
  word-break: break-word;
}

.recipe-rating-container {
  list-style: none;
  padding: 0;
  margin: 0.25em 0 0;
  display: flex;
  flex-direction: row;
  gap: 0.1em;
  color: #e4dc00;
}

.recipe-star-container {
  display: flex;
  flex-direction: row;
  width: 7.5em;
  height: 1.3em;
}

.recipe-info-container {
  display: flex;
  flex-direction: column;
  padding: 0.75em 1.25em 0;
}

hr {
  margin: 0 1.25em;
  border: rgb(255, 255, 255) 1px solid;
}

.card-bottom-container {
  text-align: center;
  margin-top: auto;
}

.bottom-section-text {
  align-self: center;
  width: fit-content;
  margin: 1em auto;
  font-size: 0.9em;
}

@media (min-width: 526px) {
  .recipe-card {
    min-height: 28em;
    grid-template-rows: 1fr 1fr;
  }

  .recipe-image-container {
    max-height: 13em;
    height: unset;
  }
}

@media (min-width: 768px) {
  .recipe-card {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    min-height: unset;
    max-width: unset;
		box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.5) inset;
  }

  .recipe-card:hover {
    transform: scale(1.01);
  }

  .recipe-image-container {
    aspect-ratio: 16/11;
    align-self: center;
    grid-row-start: 1;
    grid-row-end: 3;
    height: 100%;
    max-height: unset;
    width: 32vw;
    max-width: 21em;
    margin-right: 1.25em;
		box-shadow: 0 0 6px 1.5px rgba(0, 0, 0, 0.6);
  }

  .recipe-image {
    max-width: 100%;
    border-bottom: none;
    border-right: solid black 3px;
    border-radius: 5px 0 0 5px;
  }

  .recipe-heading {
    margin: 0.35em 0 0;
  }

  .recipe-info-container {
    padding: 0.75em 1em 0 0;
  }

  hr {
    margin: 0;
  }

  .card-bottom-container {
    grid-column-start: 2;
    grid-column-end: 4;
    padding-right: 1em;
  }
}

@media (min-width: 1400px) {
  .recipe-card {
    min-height: 14em;
  }

  .recipe-image-container {
    width: 21vw;
  }
}

@media (min-width: 1800px) {
  .recipe-heading {
    font-size: 1.8em;
  }

  .recipe-star-container {
    width: 8em;
    height: 1.4em;
  }

  .recipe-description {
    font-size: 1.1em;
  }
}
</style>
