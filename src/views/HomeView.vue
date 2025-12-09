<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  >
  </GetMethodError>

  <template v-else>
    <SidebarPanel />
    <Header></Header>
		
    <main>
      <RecipeCardSection :recipes="store.recipes" />
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
    };
  },

  methods: {
    async fetchAllRecipes() {
      this.loading = true;
      try {
        const response = await fetch(
          'REMOVED/REMOVED/recipes',
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
        this.fetchAllRecipesIndividually();
      } catch (error) {
        this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
    },

    fetchAllRecipesIndividually() {
      this.store.recipes.forEach((recipe) => {
        setTimeout(async () => {
          try {
            const response = await fetch(
              `REMOVED/REMOVED/recipes/${recipe.id}`,
            );
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
  },

  async mounted() {
    if (this.store.recipes.length === 0) {
      this.fetchAllRecipes();
    }
  },
};
</script>

<style scoped>
main {
  display: flex;
}
</style>
