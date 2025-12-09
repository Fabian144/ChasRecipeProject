<script>

import PortionSlider from './PortionSlider.vue';
import { fetchData } from '@/modules/fetchRecipeData.js';
import StarDisplay from '@/components/StarDisplay.vue';

export default {
  components: 
  {
    PortionSlider,
    StarDisplay,
  },
  
  
  data() {
    return {      
      //***fetched recipe container***
      fetchedRecipe: null,

      //***recipe state variables***
      titleVar: "",
      timeInMinsVar: "",
      ingredientsVar: [],
      instructionsVar: [],
      imageUrlVar: "",
      ingredientsAmountVar: 0,
      categoriesVar: [],

      //***portion multiplier for adjusting ingredientt amounts***
      portionMultiplier: 1,

      //***calculated recipe rating***
      recipeRating: 0,

    };
  },


  async mounted() {
    try 
    {
      const recipeId = this.$route.params.recipeId;
      const url = `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes/${recipeId}`;

      this.fetchedRecipe = await fetchData(url); //from fetchRecipeData.js

      if (this.fetchedRecipe != null) 
      {
        this.setRecipeState(this.fetchedRecipe);
        this.fetchedRecipeChecker();
      } 
      else 
      {
        this.$router.push({ name: 'RouteError' });
      }
    } catch (error) 
    {
      console.error("Error fetching or parsing JSON:", error);
    }
  },
  
  methods: 
  {

    setRecipeState(recipe) //recipe = fetchedRecipe
    {

      this.titleVar = recipe.title;
      this.timeInMinsVar = recipe.timeInMins;
      this.ingredientsVar = recipe.ingredients;
      this.instructionsVar = recipe.instructions;
      this.imageUrlVar = recipe.imageUrl;
      this.ingredientsAmountVar = recipe.ingredients.length;
      this.categoriesVar = recipe.categories;

      
      this.recipeRating = this.calculateAverageRating(recipe.ratings);

    },

    
    fetchedRecipeChecker() 
    {
          // Skillnad på false och !falsy
          if (!this.titleVar) 
          {
            this.titleVar = 'missing';
          }
          if (!this.timeInMinsVar) 
          {
            this.timeInMinsVar = 'missing';
          }
          if (this.ingredientsVar.length === 0) 
          {
            this.ingredientsVar = ['missing'];
          }
          if (this.instructionsVar.length === 0) 
          {
            this.instructionsVar = ['missing'];
          }
          if (!this.imageUrlVar) 
          {
            this.imageUrlVar = 'missing';
          }
          if (!this.ingredientsAmountVar) 
          {
            this.ingredientsAmountVar = 'missing';
          }
          if (this.categoriesVar.length === 0) 
          {
            this.categoriesVar = ['missing'];
          }
    },


    calculateAverageRating(currentRatings) 
    {
      if (!Array.isArray(currentRatings) || currentRatings.length === 0) 
      {
        return 0;
      }

      let totalRatingSum = 0;
      let totalVotes = currentRatings.length; //totalt antal röster i arrayen

      for (let i = 0; i < totalVotes; i++) 
      {
        totalRatingSum += currentRatings[i]; //alla ratings i arrayen plusas ihop in till totalRatingSum
      }

      let result = totalRatingSum / totalVotes; //medelvärdet räknas ut
      return result;
    }
    

  }
}
</script>

<template>
  <section class="Title_and_recipe_information">
    <div class="recipe_title">
      <h2>
        {{ titleVar }}
      </h2>
    </div>

    <div class="main_content_wrapper">
      <div class="recipe_info_card">
        <div class="recipe_image">
          <img v-bind:src="imageUrlVar" alt="alt img var">

          <div class="rating-display" v-if="fetchedRecipe && recipeRating > 0"> <!-- göra till funktion? -->
            <span class="rating-number">
              {{ recipeRating.toFixed(1) }} <!-- toFixed(1), en decimal -->
            </span>
              
            <div class="star-rating-container">
              <StarDisplay :value-to-display="recipeRating" />
            </div>

            <span class="rating-count">
              ({{ fetchedRecipe.ratings.length }} votes)
            </span>

          </div>
        </div>

        <div class="recipe_information">
          <p>Matlagnings tid: {{ timeInMinsVar }} minuter</p>
          <p>Nödvändiga ingredienser: {{ ingredientsAmountVar }}</p>
          <p>Kategori: {{ categoriesVar.join(", ") }}</p> <!-- join för att göra array till sträng -->
        </div>
      </div>

      <div class="recipe_column">
        <div class="ingredients_div">
          <h3>Ingredienser:</h3>
          <ul>
            <li v-for="ingredient in ingredientsVar" :key="ingredient.id">

              {{ ingredient.amount * portionMultiplier }} 
              {{ ingredient.unit }} 
              {{ ingredient.name }}

            </li>
          </ul>

          <PortionSlider v-model="portionMultiplier" />

        </div>

        <div class="steps_div">
          <h3>Gör såhär:</h3>
          <ol class="steps_list">
            <li v-for="(step) in instructionsVar">
              
              {{ step }}

            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
* 
{
  box-sizing: border-box;
}

/* Main Container */
.Title_and_recipe_information 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 35px;
  margin: 20px;
  background-color: #0a070791;
  border: 3px solid #119100de;
  border-radius: 10px;
  box-shadow: #000000 0 0 10px 0;
}
/* Main Container end */


/* Title Section */
.recipe_title 
{
  width: 100%;
  margin-bottom: 20px;
}

.recipe_title h2 
{
  margin: 0;
  padding: 10px;
  font-size: 32px;
  color: rgb(14, 13, 13);
  background-color: #f3f3f3;
  border: 3px solid #000000;
  border-radius: 10px;
  padding: 10px;
}
/* Title Section End */


/* Content layout */
.main_content_wrapper 
{
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
}
/* Content layout End */

/* Info card (left side) */
.recipe_info_card 
{
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 25%;
  min-width: 250px;
  padding: 20px;
  background-color: rgba(68, 133, 56, 0.9);
  border: 3px solid #fffdfd;
  border-radius: 10px;
}
/* Info card (left side) End */

/* Recipe Image + Info*/
.recipe_image 
{
  text-align: center;
}

.recipe_image img 
{
  width: 100%;
  max-width: 400px;
  height: auto;
  border: 3px solid #ffffff;
  border-radius: 10px;
}

.recipe_information 
{
  width: 100%;
  color: #f8f8f8;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

.recipe_information p 
{
  margin: 8px 0;
  font-size: 18px;
  color: #f8f8f8;
}
/* Recipe Image + Info End */

/* Rating display */
.rating-display 
{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  max-width: fit-content;
  margin: 15px auto 10px;
  padding: 8px 16px;
  background-color: rgba(117, 116, 117, 0.9);
  border: 3px solid #fbff00d2;
  border-radius: 8px;
  color: #e4dc00;
}

.rating-number 
{
  font-size: 21px;
  font-weight: bold;
  color: #fff;
}

.star-rating-container 
{
  display: flex;
  width: 120px;
  height: 21px;
}

.rating-count 
{
  font-size: 16px;
  color: #fff;
}
/* Rating display End*/

/* Recipe column (right side) */
.recipe_column 
{
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  flex: 75%;
}
/* Recipe column (right side) End */

/* Shared card styling */
.ingredients_div, .steps_div 
{
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 320px;
  padding: 20px;
  border: 3px solid #fdfdfd;
  border-radius: 10px;
}

.ingredients_div 
{
  background-color: rgba(68, 133, 56, 0.9);
  color: #f8f8f8;
}

.steps_div 
{
  background-color: rgba(68, 133, 56, 0.9);
  color: #f8f8f8;
}

.ingredients_div h3,
.steps_div h3 
{
  margin: 0 0 10px 0;
}
/* Shared card styling End */

/* Ingredients list */
.ingredients_div ul 
{
  margin: 0 0 15px 0;
  padding: 0;
  list-style: none;
}

.ingredients_div li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Ingredients list End */

/* Steps list */
.steps_list 
{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #f8f8f8;
}

.steps_list li 
{
  padding: 15px;
  color: #fff;
  background-color: #4a4a4a;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.steps_list li:hover 
{
  transform: scale(1.02);
}
/* Steps list End */

/* Responsive */
@media (max-width: 1024px) 
{
  .main_content_wrapper 
  {
    flex-direction: column;
  }

  .recipe_info_card, .recipe_column 
  {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .recipe_column 
  {
    flex-direction: column;
  }

  .ingredients_div, .steps_div 
  {
    flex: 1 1 100%;
    min-width: 100%;
  }
}

@media (max-width: 768px) 
{
  .recipe_title h2 
  {
    font-size: 24px;
  }
}
/* Responsive end */
</style>