<template>
  <CommentSection :current-recipe="currentRecipe"/>
</template>

<script>
import CommentSection from '../components/recipepage/commentSection.vue';
import recipes from '@/modules/fetchRecipeData';

export default {
  data() {
    return {
      recipes: recipes,
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },

    currentRecipe() {
      return this.recipes.filter((recipe) => recipe.id === this.recipeId)[0];
    },
  },

  mounted() {
    setInterval(async () => {
      try {
        const response = await fetch(`/src/data/recept.json`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        this.recipes = data.recipes;
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    }, 5000);
  },

  components: {
    CommentSection,
  },
};
</script>

<style scoped></style>
