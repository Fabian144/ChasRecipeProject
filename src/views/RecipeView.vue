<template>
  <RatingSection @chosenRatingChanged="(theRating) => (chosenRating = theRating)" />
</template>

<script>
import RatingSection from '../components/recipe page/RatingSection.vue';

export default {
  data() {
    return {
      chosenRating: 0,
    };
  },

  components: {
    RatingSection,
  },
};
</script>

<style scoped></style>
