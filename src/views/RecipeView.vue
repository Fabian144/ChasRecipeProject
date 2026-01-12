<template>
  <recipeInfo :rating-posted="ratingPosted" />
  <RatingSection
    :recipe-id="recipeId"
    @rating-posted="(theBoolean) => (ratingPosted = theBoolean)"
  />
  <CommentSection :recipeId="recipeId" />
  <Footer></Footer>
</template>

<script>
import RatingSection from '@/components/recipepage/RatingSection.vue';
import CommentSection from '@/components/recipepage/commentSection.vue';
import recipeInfo from '@/components/recipepage/recipeInfo.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    CommentSection,
    RatingSection,
    recipeInfo,
    Footer,
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
