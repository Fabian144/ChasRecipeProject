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
  padding: 1em;
}

h1 {
  color: white;
  margin: 0.5rem 0 0;
  width: fit-content;
  font-size: 10vw;
}

.heading-description {
  color: white;
  margin: 0.25em 0 1.25rem;
  width: fit-content;
  font-size: 4vw;
}

input {
  width: 100%;
  height: 2.25em;
  border-radius: 5px;
}

@media (min-width: 526px) {
  h1 {
    font-size: 2.5em;
    margin: 1rem 0 0;
  }

  .heading-description {
    font-size: 1.3em;
    margin: 0.25em 0 1.75rem;
  }
}

@media (min-width: 768px) {
  header {
    margin-left: 200px;
  }
}

@media (min-width: 1400px) {
  h1 {
    font-size: 2.6em;
  }

  .heading-description {
    font-size: 1.4em;
  }
}
</style>
