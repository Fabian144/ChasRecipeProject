import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const recipeCardComponent = createApp({
  data() {
    return {
      recipes,
      starIcons: [{ rating: 1 }, { rating: 2 }, { rating: 3 }, { rating: 4 }, { rating: 5 }],
    };
  },
  methods: {
    recipeRating(recipe) {
      return Math.round(recipe.rating.current_stars);
    },
  },
});

recipeCardComponent.mount("#recipe-cards");
