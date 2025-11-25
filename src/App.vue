<template>
  <div class="background"></div>
  <router-view></router-view>
</template>

<script></script>

<style>
body {
  margin: 0;
}

.background {
  position: absolute;
  height: 100dvh;
  width: 100vw;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/images/background.png');
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  z-index: -1;
	transform: scale(1.1);
	position: fixed;
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
