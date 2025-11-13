import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RecipeView from '../views/RecipeView.vue';

let routes = [
  { path: '/', component: HomeView },
  { path: '/recipe/:recipeId', name: 'theRecipe', component: RecipeView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
