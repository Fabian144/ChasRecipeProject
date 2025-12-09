<template>
    <LoadingIcon v-if="loading"></LoadingIcon>

    <GetMethodError v-else-if="fetchErrorMessage" :error-message="fetchErrorMessage" :error-status="fetchErrorStatus">
    </GetMethodError>

    <template v-else>
        <SidebarPanel :all-instances-of-all-categories="allInstancesOfAllCategories"></SidebarPanel>
        <Header @added-search="(term) => searchTerm = term"></Header>
        <main>
            <RecipeCardSection :recipes="searchTerm ? recipesInSearch : recipesInCategory" />
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
            searchTerm: '',
            allInstancesOfAllCategories: [],

        };
    },

    computed: {
        categoryIdParameter() {
            return this.$route.params.categoryId
        },

        currentCategory() {
            return this.store.categories.find((category) => category.id === this.categoryIdParameter)

        },

        recipesInSearch() {

            return this.recipesInCategory.filter((recipe) => this.checkSearchTermMatch(recipe))


        },

        recipesInCategory() {
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
                this.saveAllCategoryInstances()
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

        checkSearchTermMatch(recipe) {
            return recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || recipe.timeInMins === Number(this.searchTerm)
        },
        saveAllCategoryInstances() {
            this.store.recipes.forEach(recipe => {
                recipe.categories.forEach(category => { this.allInstancesOfAllCategories.push(category) })
            })
        }
    },

    async mounted() {
        if (this.store.recipes.length === 0) {
            this.fetchAllRecipes();
        } else {this.saveAllCategoryInstances()}

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
