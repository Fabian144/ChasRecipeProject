import { defineStore } from 'pinia';

export const useRecipeAndCategoryStore = defineStore('recipeAndCategoryStore', {
  state: () => {
    return {
      recipes: [],
      categories: [],
    };
  },
});
