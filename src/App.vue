<template>
  <router-view></router-view>
</template>

<script></script>

<style>
body {
  margin: 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
}

.loading-icon {
  width: 150px;
  animation: spin 2s linear infinite;
}

.loading-text {
  font-size: 1.25em;
  margin: 0;
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
