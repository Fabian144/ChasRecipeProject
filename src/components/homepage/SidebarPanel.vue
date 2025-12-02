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
        `REMOVED/REMOVED/categories`,
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
  background-color: red;
}
</style>