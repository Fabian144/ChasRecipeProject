<template>
  <RatingSection
    @chosenRatingChanged="(theRating) => (chosenRating = theRating)"
    :comment-sent="commentSent"
  />

  <div class="comment-section max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md">
    <div v-if="fetchError && !isSending" class="rating-error-message">
      <p>
        {{ fetchError }}
      </p>
    </div>

    <h3 class="text-2xl font-semibold mb-4 text-gray-800">Kommentarer</h3>

    <!-- Formulär -->
    <form v-if="!commentSent" @submit.prevent="submitComment" class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700">Ditt namn</label>
        <input
          v-model="name"
          type="text"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Skriv ditt namn"
          :disabled="isSending"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Din kommentar</label>
        <textarea
          v-model="comment"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Skriv din kommentar"
          :disabled="isSending"
        ></textarea>
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <button
        type="submit"
        :disabled="isSending"
        class="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        @click=""
      >
        {{ isSending ? 'Skickar...' : 'Skicka' }}
      </button>
    </form>

    <!-- Tack-meddelande -->
    <p v-else class="text-green-600 font-semibold text-center my-3">Tack för din kommentar!</p>

    <!-- Kommentarlista -->
    <ul v-if="commentSent" class="mt-6 space-y-4">
      <li
        v-for="c in comments"
        :key="c.id"
        class="border border-gray-200 rounded-xl p-3 bg-gray-50"
      >
        <div class="flex justify-between items-center mb-1">
          <strong class="text-gray-800">{{ c.name }}</strong>
          <small class="text-gray-500 text-xs">{{ c.date }}</small>
          <div
            v-if="chosenRating > 0"
            class="chosen-star-container"
            :aria-label="`Du har gett receptet ett omdöme på ${chosenRating} av 5 stjärnor`"
          >
            <StarDisplay :rating-value="chosenRating" />
          </div>
        </div>
        <p class="text-gray-700">{{ c.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import RatingSection from './RatingSection.vue';
import StarDisplay from '../StarDisplay.vue';

export default {
  name: 'CommentSection',

  components: {
    RatingSection,
    StarDisplay,
  },

  props: {
    initialComments: {
      type: Array,
      default: () => [],
    },

    recipeId: {
      type: String,
    },
  },

  data() {
    return {
      name: '',
      comment: '',
      error: '',
      isSending: false,
      commentSent: false,
      comments: [...this.initialComments], // startar med kommentarer från recept JSON
      chosenRating: Number, // Del av omdömes systemet
      fetchError: false,
      ratingFetchPassed: false, // Del av omdömes systemet
    };
  },

  watch: {
    async isSending() {
      // Del av omdömes systemet
      if (this.isSending && this.chosenRating > 0) {
        this.fetchRatings();
      } else if (this.isSending) {
        this.ratingFetchPassed = true;
      }

      if (this.ratingFetchPassed) {
        this.displayComment();
      }
    },
  },

  methods: {
    submitComment() {
      if (!this.name.trim() || !this.comment.trim()) {
        this.error = 'Du måste fylla i både namn och kommentar.';
        return;
      }

      this.fetchError = false;
      this.error = '';
      this.isSending = true;
    },

    async fetchRatings() {
      try {
        const response = await fetch(
          `https://recipes.bocs.se/api/v1/c8d9e0f1-a2b3-4c5d-6e7f-8a9b0c1d2e3f/recipes/${this.recipeId}/ratings`,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.chosenRating),
          },
        );
        if (!response.ok) {
          this.fetchError = `Misslyckades att skicka omdöme, försök igen eller skicka utan omdöme.
					Status: ${response.status}`;
          throw new Error(`Status: ${response.status}`);
        }
        this.ratingFetchPassed = true;
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        this.isSending = false;
      }
    },

    displayComment() {
      this.comments.unshift({
        id: Date.now(),
        name: this.name,
        text: this.comment,
        date: new Date().toLocaleDateString('sv-SE'),
      });
      this.name = '';
      this.comment = '';
      this.commentSent = true;
    },
  },
};
</script>

<style scoped>
.comment-section {
  background: #c46363;
  border-radius: 12px;
  padding: 30px;
  max-width: 700px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.comment-section h4 {
  font-size: 20px;
  color: #2d6a4f;
  margin-bottom: 20px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 12px 8px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
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
  transition:
    background 0.3s ease,
    transform 0.2s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.rating-error-message {
  /* Del av omdömes systemet */
  width: fit-content;
  margin: 1em auto;
  text-align: center;
}

.chosen-star-container {
  /* Del av omdömes systemet */
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 7em;
}
</style>
