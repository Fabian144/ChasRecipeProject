import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RecipeView from '../views/RecipeView.vue';
import recipes from '../modules/fetchRecipeData.js';

let routes = [{ path: '/', component: HomeView }];

recipes.forEach((recipe) => {
  routes.push({ path: `/${recipe.name}`, name: `${recipe.name}`, component: RecipeView });
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
