<template>
  <div class="rating-section-container">
    <h3>Ge ditt betyg!</h3>

    <div class="star-container">
      <font-awesome-icon
        v-for="starIcon in starIcons"
        @click="changeChosenRating(starIcon)"
        @mouseover="hoveringOverStar(starIcon)"
        @mouseleave="hoveringOutOfStar"
        :icon="starIcon.icon"
      />
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
  data() {
    return {
      chosenRating: 0,
      starIcons: [
        { voteValue: 1, icon: 'fa-regular fa-star' },
        { voteValue: 2, icon: 'fa-regular fa-star' },
        { voteValue: 3, icon: 'fa-regular fa-star' },
        { voteValue: 4, icon: 'fa-regular fa-star' },
        { voteValue: 5, icon: 'fa-regular fa-star' },
      ],
    };
  },

  components: { FontAwesomeIcon },

  emits: ['chosenRatingChanged'],

  watch: {
    chosenRating() {
      this.$emit('chosenRatingChanged', this.chosenRating);
    },
  },

  methods: {
    emptyStar() {
      return 'fa-regular fa-star';
    },

    filledStar() {
      return 'fa-solid fa-star';
    },

    hoveringOverStar(hoveredStar) {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue <= hoveredStar.voteValue) {
          starIcon.icon = this.filledStar();
        } else {
          starIcon.icon = this.emptyStar();
        }
      });
    },

    hoveringOutOfStar() {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue > this.chosenRating) {
          starIcon.icon = this.emptyStar();
        } else {
          starIcon.icon = this.filledStar();
        }
      });
    },

    changeChosenRating(clickedStar) {
      if (this.chosenRating === clickedStar.voteValue) {
        this.chosenRating = 0;
      } else {
        this.chosenRating = clickedStar.voteValue;
      }
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

.star-container > .fa-star {
  font-size: 2em;
}

.star-container > .fa-star:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
}

.star-container > .fa-star:active {
  font-size: 2.1em;
}
</style>
