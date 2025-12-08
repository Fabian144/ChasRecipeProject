import { createRouter, createWebHistory } from 'vue-router';

const LandingPage = () => import('../components/homepage/LandingPage.vue');
const HomeView = () => import('../views/HomeView.vue');
const RecipeView = () => import('../views/RecipeView.vue');
const RouteError = () => import('../views/RouteErrorView.vue');
const CategoryView = () => import('../views/CategoryView.vue');

let routes = [
  { path: '/', component: LandingPage },
  { path: '/recipes', component: HomeView },
  { path: '/recipes/category/:categoryId', name: 'category', component: HomeView },
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
