




<!--TODO: Revidera denna komponent.
  För tillfället: Osignerad. Delvis framtagen med AI.
  Måste granskas och förstås innan jag kan stå för den. 
  Känns i stunden som att det måste finnas en enklare lösning en denna.
  Labbar vidare...
  -->





<template>
  <div class="portion_control">
    <label for="portion-slider">
      <span>Portioner: {{ modelValue }}</span>
    </label>
    <!-- Slider som är bunden till modelValue (ingång) -->
    <input 
      type="range" 
      id="portion-slider"
      v-bind:value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="1" 
      max="20" 
      step="1"
      class="slider">
    
    <p v-if="modelValue === 20" class="warning-text">
      Du får fan räkna själv nu! 🙃
    </p>
  </div>
</template>

<script>
export default {
  props: 
  {
    modelValue: Number //ingång från recipeInfo.vue
  }
}
</script>

<style scoped>
.portion_control 
{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.slider 
{
  width: 50%;
  margin-top: 5px;
  background-color: rgb(255, 255, 255);
}

.portion_control:hover
{
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.warning-text 
{
  color: #ff6b6b;
  font-weight: bold;
  margin-top: 10px;
}
</style>
