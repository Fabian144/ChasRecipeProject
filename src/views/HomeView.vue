<template>
  <LoadingIcon v-if="loading"></LoadingIcon>

  <GetMethodError
    v-else-if="fetchErrorMessage"
    :error-message="fetchErrorMessage"
    :error-status="fetchErrorStatus"
  ></GetMethodError>

  <template v-else>
    <header>
      <h1>JULRECEPT FÖR ALLA</h1>
      <p class="heading-description">
        Klassiska och moderna recept för julfrukosten, <br> julbordet och allting däremellan
      </p>
    </header>

    <main class="recipe-card-section">
      <RecipeCardSection :recipes="recipes" />
    </main>
  </template>
</template>

<script>
import LoadingIcon from '../components/LoadingIcon.vue';
import GetMethodError from '../components/GetMethodError.vue';
import RecipeCardSection from '../components/homepage/RecipeCardSection.vue';

export default {
  components: {
    LoadingIcon,
    GetMethodError,
    RecipeCardSection,
  },

  data() {
    return {
      recipes: [],
      loading: true,
      fetchErrorMessage: '',
      fetchErrorStatus: '',
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        'REMOVED/REMOVED/recipes',
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
    } catch (error) {
      this.fetchErrorMessage = `Recepten kunde inte laddas in eller hittas inte`;
      this.fetchErrorStatus = `${error.message}`;
      console.error('Fetch failed:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1em;
  height: 9em;
}

h1 {
  color: white;
  margin: 0;
  width: fit-content;
  font-size: 1.8em;
}

.heading-description {
  color: white;
  margin: 0.35em 0 0;
  width: fit-content;
  font-size: 1em;
}

@media (min-width: 526px) {
  header {
    height: 9em;
  }

  h1 {
    font-size: 2.3em;
  }

  .heading-description {
    font-size: 1.2em;
  }
}

@media (min-width: 992px) {
  h1 {
    font-size: 2.5em;
  }

  .heading-description {
    font-size: 1.3em;
  }
}

.recipe-card-section {
  display: flex;
  height: 100dvh;
}
</style>
