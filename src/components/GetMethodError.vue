<template>
  <div class="error-message-container">
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
.error-message-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
	align-items: center;
  text-align: center;
  color: white;
  font-size: 2em;
}

.error-message-container > p {
	margin: 0;
	width: fit-content;
}
</style>
