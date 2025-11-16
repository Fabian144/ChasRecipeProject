<template>
  <RatingSection @chosenRatingChanged="(theRating) => (chosenRating = theRating)" />
    <CommentSection />
</template>

<script>
import RatingSection from '../components/recipepage/RatingSection.vue';
import CommentSection from '../components/recipepage/commentSection.vue';


export default {
  data() {
    return {
      chosenRating: 0,
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },
  },

  components: {
    RatingSection,
    CommentSection,
  },
};
</script>

<style scoped></style>
