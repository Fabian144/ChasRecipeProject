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
import { fetchAllRecipesGlobal, fetchRecipeGlobal } from '@/modules/fetchRecipeData';

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
    recipesInSearch() {
      return this.store.recipes.filter((recipe) => this.checkSearchTermMatch(recipe));
    },

    filteredRecipes() {
      return this.searchTerm ? this.recipesInSearch : this.store.recipes;
    },
  },

  methods: {
    async fetchAllRecipes() {
      this.loading = true;
      try {
        const response = fetchAllRecipesGlobal;
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
            const response = fetchRecipeGlobal(recipe.id);
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
  },

  async mounted() {
    if (this.store.recipes.length === 0) {
      this.fetchAllRecipes();
    } else {
      this.saveAllCategoryInstances();
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
