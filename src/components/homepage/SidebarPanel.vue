<template>
  <button class="hamburger" v-if="!isOpen" @click="toggleMenu">☰</button>
  <aside :class="{ open: isOpen }">
    <h2>Kategorier</h2>
    <ul>
      <li v-for="category in store.categories"><router-link :key="category.id"
          :to="{ name: 'category', params: { categoryId: category.id } }" @click="closeMenu"> {{ category.name
          }}</router-link></li>
    </ul>

  </aside>
</template>

<script>
import { useRecipeAndCategoryStore } from '@/stores/allRecipesAndCategories';

export default {
  setup() {
    const store = useRecipeAndCategoryStore()
    return {
      store
    }
  },
  data() {
    return {
      categories: [],
      isOpen: false,
    }
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
          `REMOVED/REMOVED/categories`,
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.categories = await response.json();
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    },


  },

  mounted() {
    if (this.store.categories.length === 0) {
      this.fetchAllCategories();
    }
  }


}
</script>

<style scoped>
h2 {
  text-align: center;
  color: white;
}

aside {
  float: left;
  height: 100dvh;
  width: 200px;
  background-color: rgba(211, 0, 0, 0.90);
  position: fixed;
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