<template>
  <router-view></router-view>
</template>

<script></script>

<style>
body {
  margin: 0;
}

.loading {
  width: 150px;
  animation: spin 2s linear infinite;
  margin: auto;
  display: flex;
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
