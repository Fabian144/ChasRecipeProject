<template>
  <CommentSection :recipe-id="recipeId" />
</template>

<script>
import CommentSection from '../components/recipepage/commentSection.vue';
import { fetchRecipe } from '../modules/fetchRecipeData.js';

export default {
  async mounted() {
    this.currentRecipe = await fetchRecipe(this.recipeId);
  },

  data() {
    return {
      currentRecipe: Array,
    };
  },

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
