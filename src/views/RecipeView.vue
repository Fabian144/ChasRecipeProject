<template>
  <recipeInfo :rating-posted="ratingPosted" />
  <RatingSection
    :recipe-id="recipeId"
    @rating-posted="(theBoolean) => (ratingPosted = theBoolean)"
  />
  <CommentSection :recipeId="recipeId" />
</template>

<script>
import RatingSection from '@/components/recipepage/RatingSection.vue';
import CommentSection from '@/components/recipepage/commentSection.vue';
import recipeInfo from '@/components/recipepage/recipeInfo.vue';

export default {
  components: {
    CommentSection,
    RatingSection,
    recipeInfo,
  },

  data() {
    return {
      ratingPosted: false,
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },
  },
};
</script>

<style scoped></style>
