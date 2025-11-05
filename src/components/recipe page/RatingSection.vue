<template>
  <div class="rating-section-container">
    <h3>Ge ditt betyg!</h3>

    <div class="recipe-star-container">
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  data() {
    return {
      chosenRating: 0,
      starIcons: [
        { voteValue: 1, icon: `${this.emptyStar()}` },
        { voteValue: 2, icon: `${this.emptyStar()}` },
        { voteValue: 3, icon: `${this.emptyStar()}` },
        { voteValue: 4, icon: `${this.emptyStar()}` },
        { voteValue: 5, icon: `${this.emptyStar()}` },
      ],
    };
  },

	components: {
		FontAwesomeIcon
	},

  emits: ['chosenRatingChanged'],

  watch: {
    chosenRating() {
      this.$emit('chosenRatingChanged', this.chosenRating);
    },
  },

  methods: {
    emptyStar() {
      return ['far', 'star', 'xl'];
    },

    filledStar() {
      return ['fas', 'star', 'xl'];
    },

    hoveringOverStar(hoveredStar) {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue <= hoveredStar.voteValue) {
          starIcon.class = this.filledStar();
        } else {
          starIcon.class = this.emptyStar();
        }
      });
    },

    hoveringOutOfStar() {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue > this.chosenRating) {
          starIcon.class = this.emptyStar();
        } else {
          starIcon.class = this.filledStar();
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
}

.rating-section-container h3 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.recipe-star-container {
  background-color: #cfffd5;
  padding: 1.5em;
  display: flex;
  gap: 0.75em;
  width: fit-content;
}

.recipe-star-container > .fa-star {
  font-size: 2em;
}

.recipe-star-container > .fa-star:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
}
</style>
