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

  computed: {
    recipeId() {
      return this.$route.params.id;
    },
  },

  components: {
    RatingSection,
  },
};
</script>

<style scoped></style>
