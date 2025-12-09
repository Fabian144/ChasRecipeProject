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
                    'https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes',
                );
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                this.store.recipes = await response.json();
            } catch (error) {
                this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
                this.fetchErrorStatus = `${error.message}`;
                console.error('Fetch failed:', error);
            } finally {
                this.loading = false;
            }
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
