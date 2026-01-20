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
	max-width: 90%;
	margin: auto;
}

p {
  color: white;
	margin: 0;
}

@media (min-width: 768px) {
  hr {
    margin: 0 0.625em 0 13em;
  }

  footer {
    margin-left: 13em;
  }
}

@media (max-width: 635px) {
	hr {
		margin: 15px 10px 0 10px
	}

  footer {
    margin: 10px auto;
  }
}

.hr--recipe-page {
  margin: 0 10px;
}

.footer--recipe-page {
  margin: auto;
}
</style>
