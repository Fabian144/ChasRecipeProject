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

  <Footer></Footer>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import GetMethodError from '@/components/GetMethodError.vue';
import Header from '@/components/homepage/Header.vue';
import SidebarPanel from '../components/homepage/SidebarPanel.vue';
import RecipeCardSection from '@/components/homepage/RecipeCardSection.vue';
import Footer from '@/components/Footer.vue';
import { useRecipeAndCategoryStore } from '@/stores/allRecipesAndCategories';
import { allRecipesEndpoint } from '@/modules/fetchRecipeData';

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
    Footer,
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
        const response = await fetch(allRecipesEndpoint);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
        this.saveAllCategoryInstances(this.store.recipes);
      } catch (error) {
        this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRecipesInBackground() {
      try {
        const response = await fetch(allRecipesEndpoint);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const recipes = await response.json();
        this.updateRecipesIfNew(recipes);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    },

    updateRecipesIfNew(newlyFetchedRecipes) {
      const currentRecipesString = JSON.stringify(this.store.recipes);
      const newRecipesString = JSON.stringify(newlyFetchedRecipes);

      if (currentRecipesString !== newRecipesString) {
        this.store.recipes = newlyFetchedRecipes;
        this.saveAllCategoryInstances(newlyFetchedRecipes);
      }
    },

    saveAllCategoryInstances(recipes) {
      this.allInstancesOfAllCategories = [];
      recipes.forEach((recipe) => {
        recipe.categories.forEach((category) => {
          this.allInstancesOfAllCategories.push(category);
        });
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
      this.fetchRecipesInBackground();
      this.saveAllCategoryInstances(this.store.recipes);
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
