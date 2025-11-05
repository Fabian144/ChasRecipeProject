<template>
  <div class="rating-section-container">
    <h3>Ge ditt betyg!</h3>

    <div class="recipe-star-container">
      <i
        v-for="starIcon in starIcons"
        @click="changeChosenRating(starIcon)"
        @mouseover="hoveringOverStar(starIcon)"
        @mouseleave="hoveringOutOfStar"
        :class="starIcon.class"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenRating: 0,
      starIcons: [
        { voteValue: 1, class: `${this.emptyStar()}` },
        { voteValue: 2, class: `${this.emptyStar()}` },
        { voteValue: 3, class: `${this.emptyStar()}` },
        { voteValue: 4, class: `${this.emptyStar()}` },
        { voteValue: 5, class: `${this.emptyStar()}` },
      ],
    };
  },

  emits: ['chosenRatingChanged'],

  watch: {
    chosenRating() {
      this.$emit('chosenRatingChanged', this.chosenRating);
    },
  },

  methods: {
    emptyStar() {
      return 'fa-regular fa-star fa-xl';
    },

    filledStar() {
      return 'fa-solid fa-star fa-xl';
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
