import { defineStore } from 'pinia';

export const useChosenRatingStore = defineStore('rating', {
  state: () => ({ chosenRating: 0 }),
});
