<template>
  <RatingSection @chosenRatingChanged="(theRating) => (chosenRating = theRating)" />
</template>

<script>
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/CommentSection.vue';


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
    CommentSection,
  },
};
</script>

<style scoped></style>
