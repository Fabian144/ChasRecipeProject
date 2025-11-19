<template>
  <CommentSection :recipe-id="String(recipeId)" />
</template>

<script>
import CommentSection from '../components/recipepage/commentSection.vue';

export default {
  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },
  },

  components: {
    CommentSection,
  },
};
</script>

<style scoped></style>
