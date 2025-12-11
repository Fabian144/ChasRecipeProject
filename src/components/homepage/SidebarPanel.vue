<template>
  <button class="hamburger" v-if="!isOpen" @click="toggleMenu">☰</button>
  <button class="closeBurger" v-if="isOpen" @click="closeMenu">✕</button>
  <aside :class="{ open: isOpen }">
    <img src="../../images/Julrecept för Alla Logo Image.png" alt="Logotyp för Julrecept för Alla">
    <h2>Kategorier</h2>
    <ul>
      <li>
        <router-link :to="'/recipes'">Alla ({{ store.recipes.length }})</router-link>
      </li>
      <li v-for="category in store.categories">
        <router-link
          :key="category.id"
          :to="{ name: 'category', params: { categoryId: category.id } }"
          @click="closeMenu"
        >
          {{ category.name }} ({{ getCategoryRecipeAmount(category.name) }})</router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
import { useRecipeAndCategoryStore } from '@/stores/allRecipesAndCategories';
import { APIUrl, teamId } from '@/modules/fetchRecipeData';

export default {
  setup() {
    const store = useRecipeAndCategoryStore();
    return {
      store,
    };
  },
  data() {
    return {
      isOpen: false,
    };
  },

  props: {
    allInstancesOfAllCategories: Array,
  },

  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },

    async fetchAllCategories() {
      try {
        const response = await fetch(
          `${APIUrl}/${teamId}/categories`,
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.categories = await response.json();
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    },
    getCategoryRecipeAmount(categoryName) {
      return this.allInstancesOfAllCategories.filter(
        (categoryInstance) => categoryInstance === categoryName,
      ).length;
    },
  },

  mounted() {
    if (this.store.categories.length === 0) {
      this.fetchAllCategories();
    }
  },
};
</script>

<style scoped>
img {
  height: 7em;
  width: 7em;
  display: block;
  margin: 1rem auto 0;
}

h2 {
  text-align: center;
  color: white;
  margin: 0.75rem 0 0.5rem;
}

aside {
  float: left;
  height: 100dvh;
  width: 200px;
  background-color: rgba(211, 0, 0, 0.9);
  position: fixed;
  top: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li a {
  display: block;
  padding: 5px 15px;
  color: white;
  text-decoration: none;
  font-size: 18px;
}

li a:hover {
  background-color: darkred;
}

.hamburger {
  display: none;
}

.closeBurger {
  display: none;
}

/* :deep(.router-link-active) {
  background-color: rgba(0, 0, 0, 0.25);
  font-weight: bold;
} */

:deep(.router-link-exact-active) {
  background-color: darkred;
  font-weight: bold;
}

@media (max-width: 768px) {
  .hamburger {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 30px;
    background: rgba(0, 0, 0, 0.9);
    border: none;
    border-radius: 6px;
    color: white;
    padding: 0;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }

  .closeBurger {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 30px;
    background: rgba(0, 0, 0, 0.9);
    border: none;
    border-radius: 6px;
    color: white;
    padding: 0;
    top: 10px;
    left: 10px;
    cursor: pointer;
    z-index: 3;
  }

  aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100dvh;
    transform: translateX(-100%);
    z-index: 2;
  }

  aside.open {
    transform: translateX(0);
  }
}
</style>
