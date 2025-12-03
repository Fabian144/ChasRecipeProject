<template>
  <button class="hamburger" v-if="!isOpen" @click="toggleMenu">☰</button>
  <nav :class="{ open: isOpen }">
    <h2>Kategorier</h2>
    <ul>
      <li v-for="category in categories"><router-link :key="category.id"
          :to="{ name: 'category', params: { categoryId: category.id } }" @click="closeMenu"> {{ category.name
          }}</router-link></li>
    </ul>

  </nav>
</template>

<script>
export default {
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
    }
  },

  async mounted() {
    try {
      const response = await fetch(
        `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/categories`,
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      this.categories = await response.json();
      console.log(this.categories);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  },

}
</script>

<style scoped>
h2 {
  text-align: center;
  color: white;
}

nav {
  float: left;
  height: 100dvh;
  width: 200px;
  background-color: rgba(211, 0, 0, 0.90);

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
    position: fixed;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100dvh;
    transform: translateX(-100%);
    z-index: 1500;
  }

  nav.open {
    transform: translateX(0);
  }

}
</style>