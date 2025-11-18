<script>

import { getRecipes } from '../../modules/fetchRecipeData.js';

export default {
  data() 
  {
    return {
      recipeVar: "",
      recipeNameVar: "",
      cookTimeVar: "",
      ingredientsVar: [],
      stepsVar: [],
      imageVar: "",
      ingredientsAmountVar: 0,
      recipeSelectionNameVar: "",
      fetchedRecipe: null

    };
  },
  async mounted() 
  {
    try {
      const recipeList = await getRecipes();
      const recipeId = this.$route.params.recipeId;
      
      // Hitta rätt recept baserat på ID
      this.fetchedRecipe = recipeList.find(recipe => recipe.id === String(recipeId));

      if (this.fetchedRecipe != null) 
      {
        this.recipeVar = this.fetchedRecipe;
          this.recipeNameVar = this.fetchedRecipe.name;
          this.cookTimeVar = this.fetchedRecipe.cooking_time;
          this.ingredientsVar = this.fetchedRecipe.ingredients;
          this.stepsVar = this.fetchedRecipe.steps;
          this.imageVar = this.fetchedRecipe.image;
          this.ingredientsAmountVar = this.fetchedRecipe.ingredients.length;

        console.log(this.fetchedRecipe.name);
      } else 
      {
        console.error(`Recept med ID ${recipeId} hittades inte.`);
        this.recipeNameVar = "Receptet kunde inte hittas";
        this.cookTimeVar = "N/A";
        this.ingredientsAmountVar = 0;
        this.stepsVar = ["Receptet kunde inte hittas. Kontrollera receptets ID."];
        this.ingredientsVar = ["Ingredienser kunde inte hittas."];
        this.imageVar = "Error, kunde inte ladda bild.";
      }

    } catch (error) 
    {
      console.error("Error fetching or parsing JSON:", error);
    }
  },

  methods: 
  {
  }
}
</script>

<template>
  <section class="Title_and_recipe_information">
    <div class="recipe_title">
      <h2>{{ recipeNameVar }}</h2>
    </div>
    <div class="recipe_information">
      <p>Cook Time: {{ cookTimeVar }} minuter</p>
      <p>Nödvändiga ingredienser: {{ ingredientsAmountVar }}</p>
    </div>
  </section>

  <section class="steps_and_ingredients_wrapper">
    <div class="steps_div">
      <h3>Gör såhär:</h3>
      <ol class="steps_list">
        <li v-for="(step, index) in stepsVar">{{ step }}</li>
        <!---- for (int i = 0; i < stepsVar.Length; i++)--->
      </ol>
    </div>

    <div class="recipe_column">
      <div class="recipe_image">
        <img v-bind:src="imageVar" alt="alt img var">
        <p>[Dynamisk rating etc]</p>
      </div>

      <div class="ingredients_div">
        <p>Ingredienser:</p>
        <ul>
          <li v-for="(ingredient, index) in ingredientsVar">{{ ingredient }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
*
{
    box-sizing: border-box;
}

.steps_and_ingredients_wrapper 
{
    display: flex;
    flex-wrap: wrap-reverse; 
    gap: 50px;
    padding: 2%;
    align-items: flex-start;
}
.Title_and_recipe_information
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 35px;
}

.steps_and_ingredients_wrapper > .steps_div, 
.steps_and_ingredients_wrapper > .recipe_column 
{
    flex: 1 1 320px;
    min-width: 320px;
}

.steps_div 
{
    display: flex;
    flex-direction: column;
    background-color: #e4e4e4;
    padding: 20px;
    border-radius: 10px;
}

.steps_list 
{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.steps_list li 
{
    color: #fff;
    background-color: #4a4a4a;
    padding: 15px;
    border-radius: 10px;
}

.steps_list li:hover 
{
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

.ingredients_div 
{
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #1c7900;
    padding: 16px;
    border-radius: 10px;
}

.recipe_image 
{
text-align: center;
}

.recipe_image img 
{
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
}
</style>