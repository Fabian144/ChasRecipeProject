<template>
  <div class="portion_control">
    <label for="portion-slider">
      <span>

        Portioner: {{ modelValue }}

      </span>

    </label>
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

.slider:hover
{
  transform: scale(1.08);
  transition: transform 0.3s ease;
}

.warning-text 
{
  color: #ff6b6b;
  font-weight: bold;
  margin-top: 10px;
}
</style>
