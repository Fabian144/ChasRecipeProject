import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const RecipeView = () => import('../views/RecipeView.vue');

let routes = [
  { path: '/', component: HomeView },
  { path: '/recipe/:recipeId', name: 'theRecipe', component: RecipeView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
