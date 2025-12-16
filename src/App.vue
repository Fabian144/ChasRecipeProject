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
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/images/background.webp');
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  z-index: -1;
	transform: scale(1.1);
	position: fixed;
}
</style>
