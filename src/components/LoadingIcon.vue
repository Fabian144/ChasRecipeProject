<template>
  <div class="loading-container">
    <img
      src="../images/e50c7e38-b24e-4fbd-a400-516909b77df5.png"
      alt="Julgran"
      class="loading-icon"
    />
    <p class="loading-text">Laddar...</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
}

.loading-icon {
  width: 100px;
  animation: spin 2s linear infinite;
}

.loading-text {
  font-size: 1.25em;
  margin: 0;
  color: #fff700;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
