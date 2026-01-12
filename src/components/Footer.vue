<template>
  <hr :class="`hr--${variant}`" />
  <footer :class="`footer--${variant}`">
    <p>© 2025 Julrecept För Alla | Grupparbete - Front-end utveckling med ramverk</p>
  </footer>
</template>

<script>
export default {
  props: { variant: String },
};
</script>

<style scoped>
hr {
  margin: 0 10px;
}

footer {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

p {
  color: white;
}

@media (min-width: 768px) {
  hr {
    margin: 0 10px 0 13em;
  }

  footer {
    margin-left: 12.5em;
  }
}

.hr--recipe-page {
  margin: 0 10px;
}

.footer--recipe-page {
  margin-left: 0;
}
</style>
