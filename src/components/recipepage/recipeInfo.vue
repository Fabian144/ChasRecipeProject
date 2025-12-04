<script>
import PortionSlider from './PortionSlider.vue';

export default {
  components: {
    PortionSlider
  },
  data() 
  {
    return {
      //recipeMainVar: "", <--- defunct
      titleVar: "",
      //descriptionVar: "", <---defunct
      timeInMinsVar: "",
      ingredientsVar: [],
      instructionsVar: [],
      imageUrlVar: "",
      ingredientsAmountVar: 0,
      //recipeSelectionNameVar: "", <--- defunct
      categoriesVar: "",

      portionMultiplier: 1,

      fetchedRecipe: null

    };
  },
  async mounted() 
  {
    try {

      //const recipeList = await getRecipes(); <---defunct
      //this.fetchedRecipe = recipeList.find(recipe => recipe.id === String(recipeId)); <---defunct

      const recipeId = this.$route.params.recipeId;
      
      const response = await fetch(
        `REMOVED/REMOVED/recipes/${recipeId}`
      );
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      this.fetchedRecipe = await response.json();

      if (this.fetchedRecipe != null) 
      {
        //this.recipeMainVar = this.fetchedRecipe; <--- defunct!

          this.titleVar = this.fetchedRecipe.title;
          this.timeInMinsVar = this.fetchedRecipe.timeInMins;
          this.ingredientsVar = this.fetchedRecipe.ingredients;
          this.instructionsVar = this.fetchedRecipe.instructions;
          this.imageUrlVar = this.fetchedRecipe.imageUrl;
          this.ingredientsAmountVar = this.fetchedRecipe.ingredients.length;
          this.categoriesVar = this.fetchedRecipe.categories;

        // console.log(this.fetchedRecipe.name); <--- test log
      } else // <--- ta bort hela blocket senare, fabian har redan fixat??
      {
        console.error(`Recept med ID ${recipeId} hittades inte.`);
        this.titleVar = "Receptet kunde inte hittas";
        this.timeInMinsVar = "N/A";
        this.ingredientsAmountVar = 0;
        this.instructionsVar = ["Receptet kunde inte hittas. Kontrollera receptets ID."];
        this.ingredientsVar = ["Ingredienser kunde inte hittas."];
        this.imageUrlVar = "Error, kunde inte ladda bild.";
        this.categoriesVar = "N/A";
      }

    } catch (error) 
    {
      console.error("Error fetching or parsing JSON:", error);
    }
  },
}
</script>

<template>
  <section class="Title_and_recipe_information">
    <div class="recipe_title">
      <h2>{{ titleVar }}</h2>
    </div>
    <div class="recipe_information">
      <p>Matlagnings tid: {{ timeInMinsVar }} minuter</p>
      <p>Nödvändiga ingredienser: {{ ingredientsAmountVar }}</p>
      <p>Kategori: {{ categoriesVar }}</p>
    </div>
  </section>

  <section class="steps_and_ingredients_wrapper">
    <div class="steps_div">
      <h3>Gör såhär:</h3>
      <ol class="steps_list">
        <li v-for="(step) in instructionsVar">{{ step }}</li>
        <!---- for (int i = 0; i < stepsVar.Length; i++)--->
      </ol>
    </div>

    <div class="recipe_column">
      <div class="recipe_image">
        <img v-bind:src="imageUrlVar" alt="alt img var">
        <p>[Dynamisk rating etc]</p>
      </div>

      <div class="ingredients_div">
        <p>Ingredienser:</p>
        <ul>
          <li v-for="ingredient in ingredientsVar" :key="ingredient.id">
            
            {{ ingredient.amount * portionMultiplier }} {{ ingredient.unit }} {{ ingredient.name }}
            
          </li>
          <div class="ingredients_header">
            <PortionSlider v-model="portionMultiplier" /> 
            <!-- 
            utgångg och ingång till portionSlider.vue 
            Kommer att revideras. Se PortionSlider.vue för mer info.
            -->
          </div>
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
    color: #fff;
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