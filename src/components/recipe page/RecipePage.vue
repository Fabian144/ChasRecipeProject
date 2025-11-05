<template>
  <RatingSection @chosenRatingChanged="(rating) => (chosenRating = rating)" />
</template>

<script>
import RatingSection from './RatingSection.vue';

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
