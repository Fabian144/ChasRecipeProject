import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipeStore', {
  state: () => {
    return {
      recipes: [],
    };
  },
});
