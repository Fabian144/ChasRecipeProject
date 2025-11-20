<template>
  <CommentSection :recipe-id="recipeId" />
</template>

<script>
import CommentSection from '../components/recipepage/commentSection.vue';
import { fetchRecipe } from '../modules/fetchRecipeData.js';

export default {
  components: {
    CommentSection,
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

  async mounted() {
    this.currentRecipe = await fetchRecipe(this.recipeId);
  },
};
</script>

<style scoped></style>
