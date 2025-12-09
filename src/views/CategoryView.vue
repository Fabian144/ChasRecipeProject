<template>
	<LoadingIcon v-if="loading"></LoadingIcon>

	<GetMethodError v-else-if="fetchErrorMessage" :error-message="fetchErrorMessage" :error-status="fetchErrorStatus">
	</GetMethodError>

	<template v-else>
		<SidebarPanel></SidebarPanel>
		<Header></Header>
		<main class="recipe-card-section">
			<RecipeCardSection :recipes="filteredRecipes" />
		</main>
	</template>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import GetMethodError from '@/components/GetMethodError.vue';
import Header from '@/components/homepage/Header.vue';
import SidebarPanel from '../components/homepage/SidebarPanel.vue';
import RecipeCardSection from '@/components/homepage/RecipeCardSection.vue';
import { useRecipeAndCategoryStore } from '@/stores/allRecipesAndCategories';


export default {
	setup() {
		const store = useRecipeAndCategoryStore();
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

	computed: {
		categoryIdParameter() {
			return this.$route.params.categoryId
		},

		currentCategory() {
			return this.store.categories.filter((category) => category.id === this.categoryIdParameter)[0]

		},

		filteredRecipes() {
			return this.store.recipes.filter((recipe) => this.checkCorrectedCategories(recipe.categories))

		}
	},



	methods: {
		async fetchAllRecipes() {
			this.loading = true;
			try {
				const response = await fetch(
					'REMOVED/REMOVED/recipes',
				);
				if (!response.ok) {
					throw new Error(`Status: ${response.status}`);
				}
				this.store.recipes = await response.json();
				this.fetchAllRecipesIndividually();
			} catch (error) {
				this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
				this.fetchErrorStatus = `${error.message}`;
				console.error('Fetch failed:', error);
			} finally {
				this.loading = false;
			}
		},

		fetchAllRecipesIndividually() {
			this.store.recipes.forEach((recipe) => {
				setTimeout(async () => {
					try {
						const response = await fetch(
							`REMOVED/REMOVED/recipes/${recipe.id}`,
						);
						if (!response.ok) {
							throw new Error(`Status: ${response.status}`);
						}
						const newRecipe = await response.json();
						recipe.ingredients = newRecipe.ingredients;
					} catch (error) {
						console.error('Fetch failed:', error);
					}
				}, 1000);
			});
		},

		checkCorrectedCategories(categoryNames) {
			return categoryNames.filter(categoryName => this.correctCategories(categoryName))[0] === this.currentCategory.name
		},

		correctCategories(categoryName) {
			return categoryName === this.currentCategory.name
		},

		onFetchedCategories(categories) {
			this.store.categories = categories;
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
.recipe-card-section {
	display: flex;
	height: 100dvh;
}
</style>
