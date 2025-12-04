<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  ></GetMethodError>

  <template v-else>
    <recipeInfo />
    <RatingSection :recipe-id="recipeId" />
    <CommentSection />
  </template>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import GetMethodError from '@/components/GetMethodError.vue';
import RatingSection from '@/components/recipepage/RatingSection.vue';
import CommentSection from '@/components/recipepage/commentSection.vue';
import recipeInfo from '@/components/recipepage/recipeInfo.vue';
import { useRecipeStore } from '@/stores/allRecipes';

export default {
  setup() {
    const store = useRecipeStore();
    return { store };
  },

  components: {
    LoadingIcon,
    GetMethodError,
    CommentSection,
    RatingSection,
    recipeInfo,
  },

  data() {
    return {
      currentRecipe: {},
      loading: false,
      fetchErrorMessage: '',
      fetchErrorStatus: '',
    };
  },

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },

    currentRecipeByFilter() {
      return this.store.recipes.filter((recipe) => recipe.id === this.recipeId)[0];
    },
  },

  methods: {
    async fetchRecipe() {
      this.loading = true;
      try {
        const response = await fetch(
          `REMOVED/REMOVED/recipes/${this.recipeId}`,
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.currentRecipe = await response.json();
      } catch (error) {
        this.fetchErrorMessage = 'Receptet kunde inte laddas in eller hittas inte';
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
    },

    setCurrentRecipe() {
      this.currentRecipe = this.currentRecipeByFilter;
    },
  },

  async mounted() {
    if (this.store.recipes.length === 0) {
      this.fetchRecipe();
    } else {
      this.setCurrentRecipe();
    }
  },
};
</script>

<style scoped></style>
