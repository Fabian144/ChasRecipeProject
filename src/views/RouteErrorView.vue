<template>
  <div class="not-found">
    <h1>404 – Den här sidan finns inte</h1>
    <a href="/">Gå till startsidan</a>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  height: 100dvh;
  display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
}

a {
	font-size: 1.25em;
	color: white;
}
</style>
