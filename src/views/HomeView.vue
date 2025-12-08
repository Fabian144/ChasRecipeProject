<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  ></GetMethodError>

  <template v-else>
    <Header></Header>
    <SidebarPanel />
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
import { useRecipeStore } from '@/stores/allRecipes';


export default {
  setup() {
    const store = useRecipeStore();
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
          'https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes',
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
      } catch (error) {
        this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
        this.fetchErrorStatus = `${error.message}`;
        console.error('Fetch failed:', error);
      } finally {
        this.loading = false;
      }
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
