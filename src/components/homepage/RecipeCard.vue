<template>
  <a class="recipe-card-link" href="./recipePage.html">
    <article class="recipe-card">
      <figure class="recipe-image-container">
        <img :src="recipeImage" :alt="recipeAltText" />
      </figure>

      <div class="recipe-info-container">
        <h2 class="recipe-heading">
          {{ recipeName }}
        </h2>

        <div class="recipe-star-container">
          <font-awesome-icon
            v-for="starIcon in starIcons"
            :icon="
              starIcon.rating <= Math.round(recipeRating)
                ? 'fa-solid fa-star'
                : 'fa-regular fa-star'
            "
          />
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
  </a>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(fas, far, faStar);

export default {
  data() {
    return {
      starIcons: [{ rating: 1 }, { rating: 2 }, { rating: 3 }, { rating: 4 }, { rating: 5 }],
    };
  },

  components: {
    FontAwesomeIcon,
  },

  props: {
    recipeImage: String,
    recipeName: String,
    recipeAltText: String,
    recipeDescription: String,
    recipeIngredients: Array,
    recipeCookingTime: String,
    recipeRating: Number,
  },
};
</script>

<style scoped>
.recipe-card-link {
  color: unset;
  text-decoration: none;
}

.recipe-card {
  background-color: #c3c3c3;
  display: flex;
  flex-direction: column;
  max-width: 92.5%;
  margin: 0 auto 5%;
}

.recipe-card:hover {
  box-shadow: #00000096 1px 1px 10px 1px;
}

.recipe-image-container {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.75em 0.75em 0;
}

img {
  width: 100%;
  border: solid black 4px;
}

.recipe-heading {
  font-size: 2.2em;
  margin: 0;
}

.recipe-star-container {
  margin-top: 0.5em;
}

.recipe-star-container > .fa-star {
  font-size: 1.6em;
  margin: -1px;
}

.recipe-info-container {
  display: flex;
  flex-direction: column;
  padding: 0.75em 1.25em 0;
}

.recipe-description {
  font-size: 1.25em;
}

hr {
  margin: 0 1.25em;
}

.recipe-bottom-container {
  text-align: center;
}

.recipe-bottom-text {
  align-self: center;
  font-size: 1.2em;
}

@media (min-width: 768px) {
  .recipe-card-link {
    margin: 0 1.5em 1em;
    display: inline-block;
  }

  .recipe-card {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-rows: 1fr;
    margin: 0;
    max-width: 100%;
  }

  .recipe-image-container {
    align-items: center;
    justify-content: unset;
    padding: 1.25em;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  img {
    width: unset;
    max-width: 100%;
  }

  .recipe-heading {
    font-size: 2.4em;
    margin: 0.35em 0 0;
  }

  .recipe-star-container {
    margin-top: 0.5em;
  }

  .recipe-info-container {
    padding: 1em 1em 0;
  }

  hr {
    margin: 0 1em 0 0;
  }

  .recipe-bottom-container {
    grid-column-start: 2;
    grid-column-end: 4;
  }
}

@media (min-width: 992px) {
  .recipe-card {
    grid-template-columns: 1fr 12fr;
  }

  img {
    max-width: unset;
  }
}
</style>
