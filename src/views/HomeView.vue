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
        const response = await fetch(`${APIUrl}/${teamId}/recipes`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
        this.fetchAllRecipesIndividually(this.store.recipes);
        this.saveAllCategoryInstances(this.store.recipes);
      } catch (error) {
        this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
    },

    fetchAllRecipesIndividually(recipes) {
      recipes.forEach((recipe) => {
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
