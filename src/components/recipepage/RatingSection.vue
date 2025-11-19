<template>
  <div class="rating-section-container">
    <h3>Ge ditt betyg!</h3>

    <div class="star-container">
      <button
        v-for="starIcon in starIcons"
        @click="(changeChosenRating(starIcon), animateClickedStar(starIcon))"
        @mouseover="hoveringOverStar(starIcon)"
        @mouseleave="hoveringOutOfStar"
        :class="starIcon.class"
        :aria-label="`Ge ett omdöme på ${starIcon.voteValue} av 5 stjärnor`"
      >
        <font-awesome-icon :icon="starIcon.icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { useChosenRatingStore } from '@/stores/chosenRating.js';

library.add(fas, far, faStar);

export default {
  setup() {
    const store = useChosenRatingStore();
    return { store };
  },

  data() {
    return {
      starIcons: [
        { voteValue: 1, icon: 'fa-regular fa-star', class: String },
        { voteValue: 2, icon: 'fa-regular fa-star', class: String },
        { voteValue: 3, icon: 'fa-regular fa-star', class: String },
        { voteValue: 4, icon: 'fa-regular fa-star', class: String },
        { voteValue: 5, icon: 'fa-regular fa-star', class: String },
      ],
      emptyStar: 'fa-regular fa-star',
      filledStar: 'fa-solid fa-star',
    };
  },

  components: { FontAwesomeIcon },

  methods: {
    hoveringOverStar(hoveredStar) {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue <= hoveredStar.voteValue) {
          starIcon.icon = this.filledStar;
        } else {
          starIcon.icon = this.emptyStar;
        }
      });
    },

    hoveringOutOfStar() {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue > this.store.chosenRating) {
          starIcon.icon = this.emptyStar;
        } else {
          starIcon.icon = this.filledStar;
        }
      });
    },

    changeChosenRating(clickedStar) {
      if (this.store.chosenRating === clickedStar.voteValue) {
        this.store.chosenRating = 0;
        clickedStar.icon = this.emptyStar;
      } else {
        this.store.chosenRating = clickedStar.voteValue;
        clickedStar.icon = this.filledStar;
      }
    },

    animateClickedStar(clickedStar) {
      this.store.chosenRating > 0 ? (clickedStar.class = 'clicked') : (clickedStar.class = String);
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

@keyframes starClickAnimation {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
