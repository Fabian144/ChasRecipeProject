<template>
    <LoadingIcon v-if="loading"></LoadingIcon>

    <GetMethodError v-else-if="fetchErrorMessage" :error-message="fetchErrorMessage" :error-status="fetchErrorStatus">
    </GetMethodError>

    <template v-else>
        <SidebarPanel></SidebarPanel>
        <Header></Header>
        <main>
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
            return this.store.categories.find((category) => category.id === this.categoryIdParameter)

        },

        filteredRecipes() {
            return this.store.recipes.filter((recipe) => this.checkCorrectCategory(recipe))

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
            } catch (error) {
                this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
                this.fetchErrorStatus = `${error.message}`;
                console.error('Fetch failed:', error);
            } finally {
                this.loading = false;
            }
        },

        checkCorrectCategory(recipe) {
            return recipe.categories.find(categoryName => this.correctCategory(categoryName)) === this.currentCategory.name
        },

        correctCategory(categoryName) {
            return categoryName === this.currentCategory.name
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
main {
    display: flex;
    margin: 0;

}

@media (min-width: 768px) {
    main {
        margin-left: 210px;
    }
}
</style>
