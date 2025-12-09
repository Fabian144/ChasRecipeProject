<template>
  <div class="recipe_information">
    <p>Matlagnings tid: {{ timeInMins }} minuter</p>
    <p>Nödvändiga ingredienser: {{ ingredientsAmount }}</p>
    <p>Kategori: {{ categories.join(", ") }}</p>
  </div>
</template>

<script>
export default {
  name: 'RecipeInfoCard',
  props: {
    timeInMins: {
      type: [String, Number],
      required: true
    },
    ingredientsAmount: {
      type: [String, Number],
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe_information {
  width: 100%;
  color: #f8f8f8;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}
.recipe_information p {
  margin: 8px 0;
  font-size: 18px;
}
</style>
