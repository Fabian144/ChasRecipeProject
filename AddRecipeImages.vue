<template>
  <div v-if="loading">Laddar...</div>

  <div v-else class="forms">
    <form v-for="recipe in recipes" @submit.prevent="postImage(recipe.id, this.imageUrl)">
      <label>Byt bild för: {{ recipe.title }}</label>
      <p>Nuvarande: {{ recipe.imageUrl }}</p>
      <input type="url" v-model.lazy="imageUrl" placeholder="Länk till bilden" />
      <button type="submit">Byt bild</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
      imageUrl: '',
      loading: true,
    };
  },

  methods: {
    async postImage(id, imageUrl) {
      if (this.imageUrl) {try {
        const response = await fetch(
          `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes/${id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({ imageUrl: `${imageUrl}` }),
            headers: { 'Content-type': 'application/json' },
          },
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      }}
      
    },
  },

  async mounted() {
    this.loading = true;
    try {
      const response = await fetch(
        `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes`,
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      this.recipes = await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
input {
  width: 50%;
  margin: 1em;
  height: 2em;
}

form {
  padding: 1em;
}

.forms {
  display: flex;
  flex-direction: column;
}
</style>
