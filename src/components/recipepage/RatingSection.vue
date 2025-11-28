<template>
  <div class="rating-section-container">
    <h3>Ge ditt betyg!</h3>

    <div class="star-container">
      <button
        v-for="starIcon in starIcons"
        @click="
          (hoveringOverStar(starIcon), changeChosenRating(starIcon), animateClickedStar(starIcon))
        "
        @mouseover="hoveringOverStar(starIcon)"
        @mouseleave="hoveringOutOfStar"
        :class="[starIcon.class, starIcon.icon]"
        :aria-label="`Ge ett omdöme på ${starIcon.value} av 5 stjärnor`"
        :disabled="ratingPosted || postingRating"
      >
        <font-awesome-icon :icon="starIcon.icon" />
      </button>
    </div>

    <button
      v-if="chosenRating"
      class="send-rating-button"
      @click="postingRating = true"
      :disabled="ratingPosted || postingRating"
    >
      {{ postingRating ? 'Skickar...' : 'Skicka' }}
    </button>

    <div v-if="fetchErrorStatus" class="rating-error-message">
      <p>
        Misslyckades att skicka omdöme, försök igen <br />
        {{ fetchErrorStatus }}
      </p>
    </div>

    <div v-if="ratingPosted" class="thank-you-message">
      <p>Tack för ditt omdöme!</p>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(fas, far, faStar);

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      starIcons: [
        { value: 1, icon: 'fa-regular fa-star', class: String },
        { value: 2, icon: 'fa-regular fa-star', class: String },
        { value: 3, icon: 'fa-regular fa-star', class: String },
        { value: 4, icon: 'fa-regular fa-star', class: String },
        { value: 5, icon: 'fa-regular fa-star', class: String },
      ],
      emptyStar: 'fa-regular fa-star',
      filledStar: 'fa-solid fa-star',
      chosenRating: 0,
      fetchErrorStatus: '',
      postingRating: false,
      ratingPosted: false,
    };
  },

  props: {
    recipeId: String,
  },

  watch: {
    chosenRating() {
      if (this.chosenRating === 0) {
        this.starIcons.forEach((starIcon) => {
          starIcon.icon = this.emptyStar;
        });
      }
    },

    async postingRating() {
      if (this.postingRating) {
        this.fetchErrorStatus = '';
        try {
          const response = await fetch(
            `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes/${this.recipeId}/ratings`,
            {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify(this.chosenRating),
            },
          );
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          this.ratingPosted = true;
        } catch (error) {
          this.fetchErrorStatus = `${error.message}`;
          console.error('Fetch failed:', error);
        } finally {
          this.postingRating = false;
        }
      }
    },
  },

  methods: {
    hoveringOverStar(hoveredStar) {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.value <= hoveredStar.value) {
          starIcon.icon = this.filledStar;
        } else {
          starIcon.icon = this.emptyStar;
        }
      });
    },

    hoveringOutOfStar() {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.value > this.chosenRating) {
          starIcon.icon = this.emptyStar;
        } else {
          starIcon.icon = this.filledStar;
        }
      });
    },

    changeChosenRating(clickedStar) {
      this.fetchErrorStatus = '';
      if (clickedStar.value === this.chosenRating) {
        this.chosenRating = 0;
      } else {
        this.chosenRating = clickedStar.value;
      }
    },

    animateClickedStar(clickedStar) {
      this.chosenRating ? (clickedStar.class = 'clicked') : (clickedStar.class = String);
      setTimeout(() => (clickedStar.class = String), 250);
    },
  },
};
</script>

<style scoped>
.rating-section-container {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.rating-section-container h3 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #ffffff;
}

.star-container {
  background-color: #cfffd5;
  padding: 0.75em;
  display: flex;
  gap: 0.5em;
  width: fit-content;
}

.star-container > button {
  font-size: 2em;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.star-container > button:hover {
  cursor: pointer;
}

.star-container > button:focus-visible {
  outline: solid black 2px;
}

.star-container > button.clicked {
  animation: starClickAnimation;
  animation-duration: 250ms;
}

.send-rating-button {
  margin-top: 1em;
  font-size: 1em;
  padding: 0.5em 0.7em;
  cursor: pointer;
  background-color: #000;
  border: none;
  color: white;
  border-radius: 100px;
}

.send-rating-button:hover {
  box-shadow: black 0 0 5px 0;
}

.send-rating-button:disabled {
  cursor: not-allowed;
}

.rating-error-message {
  width: fit-content;
  margin: 0;
  text-align: center;
  color: white;
}

.thank-you-message {
  width: fit-content;
  margin: 0;
  color: white;
}

@keyframes starClickAnimation {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
