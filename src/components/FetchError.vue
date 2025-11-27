<template>
  <div class="error-message">
    <h1>
      <p>{{ errorMessage }}</p>
      <p>Status: {{ errorStatus }}</p>
    </h1>
  </div>
</template>

<script>
export default {
  props: { errorMessage: String, errorStatus: Number },
};
</script>

<style scoped>
.error-message {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}
</style>
