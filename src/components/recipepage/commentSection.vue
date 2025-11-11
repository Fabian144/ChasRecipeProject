<template>
  <section class="comment-section">
    <h4>Dela din smakupplevelse</h4>

    <input type="text" v-model="userName" placeholder="Ditt namn" />
    <textarea v-model="userComment" placeholder="Skriv din kommentar här"></textarea>
    <button @click="addComment">Skicka</button>

    <div id="commentList">
      <div v-if="comments.length === 0">
        <p>Inga kommentarer ännu.</p>
      </div>

      <div v-for="(c, index) in comments" :key="index" class="comment">
        <strong>{{ c.user }}</strong>
        <p>{{ c.text }}</p>
        <span>{{ c.date }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Importera din JSON-fil med kommentarer
import commentsData from '../data/comments.json' 



// Reactive states
const userName = ref('')
const userComment = ref('')
const comments = ref([])

// Hämta recipeId från URL
const recipeId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1

// Ladda kommentarer från JSON
function loadComments() {
  const recipeComments = commentsData.find(c => c.recipeId === recipeId)
  comments.value = recipeComments ? recipeComments.comments : []
}

// Lägg till ny kommentar
function addComment() {
  if (!userName.value || !userComment.value) {
    alert('Vänligen fyll i både namn och kommentar!')
    return
  }

  const date = new Date().toISOString().slice(0, 10)
  comments.value.push({
    user: userName.value,
    text: userComment.value,
    date
  })

  // Rensa input-fälten
  userName.value = ''
  userComment.value = ''
}

// Kör när komponenten mountas
onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-section {
  background: #c46363;
  border-radius: 12px;
  padding: 30px;
  max-width: 700px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.comment-section h4 {
  font-size: 20px;
  color: #2d6a4f;
  margin-bottom: 20px;
  font-weight: 600;
}

input, textarea {
  width: 100%;
  padding: 12px 8px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #2d6a4f;
  box-shadow: 0 0 5px rgba(45, 106, 79, 0.2);
  outline: none;
}

button {
  background-color: #2d6a4f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 15px;
  display: block;
  margin: 0 auto;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #37966f;
  transform: scale(1.05);
}

#commentList {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment {
  background-color: #f1f8f5;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.comment strong {
  display: block;
  font-size: 16px;
  color: #14532d;
  margin-bottom: 5px;
}

.comment p {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.comment span {
  font-size: 12px;
  color: #6b7280;
  float: right;
  margin-top: 5px;
}
</style>
