import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const RecipeView = () => import('../views/RecipeView.vue');
const RouteError = () => import('../views/RouteErrorView.vue');

let routes = [
  { path: '/', component: HomeView },
  { path: '/recipe/:recipeId', name: 'theRecipe', component: RecipeView },
  {
    path: '/:pathMatch(.*)*',
    name: 'RouteError',
    component: RouteError,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
