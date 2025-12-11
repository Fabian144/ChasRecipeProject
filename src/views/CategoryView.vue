<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  >
  </GetMethodError>

  <template v-else>
    <Header @added-search="(term) => (searchTerm = term)"></Header>
    <SidebarPanel :all-instances-of-all-categories="allInstancesOfAllCategories" />
    <main>
      <RecipeCardSection :recipes="filteredRecipes" />
    </main>
  </template>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import GetMethodError from '@/components/GetMethodError.vue';
import Header from '@/components/homepage/Header.vue';
import SidebarPanel from '../components/homepage/SidebarPanel.vue';
import RecipeCardSection from '@/components/homepage/RecipeCardSection.vue';
import { useRecipeAndCategoryStore } from '@/stores/allRecipesAndCategories';
import { APIUrl, teamId } from '@/modules/fetchRecipeData';

export default {
  setup() {
    const store = useRecipeAndCategoryStore();
    return { store };
  },

  components: {
    LoadingIcon,
    GetMethodError,
    Header,
    RecipeCardSection,
    SidebarPanel,
  },

  data() {
    return {
      loading: false,
      fetchErrorMessage: '',
      fetchErrorStatus: '',
      searchTerm: '',
      allInstancesOfAllCategories: [],
    };
  },

  computed: {
    categoryIdParameter() {
      return this.$route.params.categoryId;
    },

    currentCategory() {
      return this.store.categories.find((category) => category.id === this.categoryIdParameter);
    },

    recipesInSearch() {
      return this.recipesInCategory.filter((recipe) => this.checkSearchTermMatch(recipe));
    },

    recipesInCategory() {
      return this.store.recipes.filter((recipe) => this.checkCorrectCategory(recipe));
    },

    filteredRecipes() {
      return this.searchTerm ? this.recipesInSearch : this.recipesInCategory;
    },
  },

  methods: {
    async fetchAllRecipes() {
      this.loading = true;
      try {
        const response = await fetch(`${APIUrl}/${teamId}/recipes`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
        this.saveAllCategoryInstances();
        this.fetchAllRecipesIndividually();
      } catch (error) {
        this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
    },

    saveAllCategoryInstances() {
      this.allInstancesOfAllCategories = [];
      this.store.recipes.forEach((recipe) => {
        recipe.categories.forEach((category) => {
          this.allInstancesOfAllCategories.push(category);
        });
      });
    },

    fetchAllRecipesIndividually() {
      this.store.recipes.forEach((recipe) => {
        setTimeout(async () => {
          try {
            const response = await fetch(`${APIUrl}/${teamId}/recipes/${recipe.id}`);
            if (!response.ok) {
              throw new Error(`Status: ${response.status}`);
            }
            const newRecipe = await response.json();
            recipe.ingredients = newRecipe.ingredients;
          } catch (error) {
            console.error('Fetch failed:', error);
          }
        }, 1000);
      });
    },

    checkSearchTermMatch(recipe) {
      return (
        recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recipe.timeInMins === Number(this.searchTerm)
      );
    },

    checkCorrectCategory(recipe) {
      return (
        recipe.categories.find((categoryName) => this.correctCategory(categoryName)) ===
        this.currentCategory.name
      );
    },

    correctCategory(categoryName) {
      return categoryName === this.currentCategory.name;
    },

    async fetchRecipesInBackground() {
      try {
        const response = await fetch(`${APIUrl}/${teamId}/recipes`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        this.updateRecipesIfNew(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    },

    updateRecipesIfNew(newlyFetchedRecipes) {
      if (this.store.recipes !== newlyFetchedRecipes) {
        this.store.recipes = newlyFetchedRecipes;
        this.saveAllCategoryInstances();
        this.fetchAllRecipesIndividually();
      }
    },
  },

  async mounted() {
    if (this.store.recipes.length === 0) {
      this.fetchAllRecipes();
    } else {
      this.saveAllCategoryInstances();
      this.fetchRecipesInBackground();
    }
  },
};
</script>

<style scoped>
main {
  display: flex;
}

@media (min-width: 768px) {
  main {
    margin-left: 12.5em;
  }
}
</style>
