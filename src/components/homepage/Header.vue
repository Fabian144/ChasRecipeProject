<template>
  <header>
    <h1>JULRECEPT FÖR ALLA</h1>
    <p class="heading-description">
      Klassiska och moderna recept för julfrukosten, <br />
      julbordet och allting däremellan
    </p>
    <input type="text" placeholder="Sök efter recept..." v-model="searchTerm" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  watch: {
    searchTerm() {
      this.$emit('addedSearch', this.searchTerm);
    },
  },
  emits: ['addedSearch'],
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1em;
  height: 9em;
}

h1 {
  color: white;
  margin: 0;
  width: fit-content;
  font-size: 1.8em;
}

.heading-description {
  color: white;
  margin: 0.35em 0 0;
  width: fit-content;
  font-size: 1em;
}

input {
  width: 100%;
  margin: 1em 0 0;
  height: 2em;
  border-radius: 5px;
}

@media (min-width: 526px) {
  header {
    height: 9em;
  }

  h1 {
    font-size: 2.3em;
  }

  .heading-description {
    font-size: 1.2em;
  }
}

@media (min-width: 768px) {
  header {
    margin-left: 210px;
  }
}

@media (min-width: 992px) {
  h1 {
    font-size: 2.5em;
  }

  .heading-description {
    font-size: 1.3em;
  }
}
</style>
