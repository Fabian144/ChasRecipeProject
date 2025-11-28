<template>
  <div class="error-message">
    <p>{{ errorMessage }}</p>
    <p>{{ errorStatus }}</p>
  </div>
</template>

<script>
export default {
  props: { errorMessage: String, errorStatus: String },
};
</script>

<style scoped>
.error-message {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
}

.error-message > p {
	margin: 0;
}
</style>
