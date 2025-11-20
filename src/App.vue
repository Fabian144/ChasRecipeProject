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
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100dvh;
}

.loading {
  width: 150px;
  animation: spin 2s linear infinite;
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
