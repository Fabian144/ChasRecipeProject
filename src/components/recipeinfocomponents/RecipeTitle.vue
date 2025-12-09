<template>
  <div class="recipe_title">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'RecipeTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe_title h2 {
  margin: 0;
  padding: 10px;
  font-size: 32px;
  color: rgb(14, 13, 13);
  background-color: #f3f3f3;
  border: 3px solid #000000;
  border-radius: 10px;
}
</style>
