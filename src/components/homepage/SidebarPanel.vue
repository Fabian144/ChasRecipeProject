<template>
  <nav>
    <ul>
      <li v-for="category in categories"><router-link :key="category.id"
          :to="{ name: 'category', params: { categoryId: category.id } }"> {{ category.name }}</router-link></li>
    </ul>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
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
nav {
  float: left;
  height: 100dvh;
  width: 200px;
}
</style>