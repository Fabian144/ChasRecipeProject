<template>
    <div class="comment-section">
        <h3 class="title">Kommentarer</h3>

        <!-- Formulär -->
        <form v-if="!commentSent" @submit.prevent="submitComment" class="form">
            <div class="form-group">
                <label>Ditt namn</label>
                <input v-model="name" type="text" placeholder="Skriv ditt namn" :disabled="isSending" />
            </div>

            <div class="form-group">
                <label>Din kommentar</label>
                <textarea v-model="comment" placeholder="Skriv din kommentar" :disabled="isSending"></textarea>
            </div>

            <p v-if="error" class="error-message">{{ error }}</p>

            <button type="submit" :disabled="isSending">
                {{ isSending ? 'Skickar...' : 'Skicka' }}
            </button>
        </form>

        <!-- Tack-meddelande -->
        <p v-else class="success-message">Tack för din kommentar!</p>

        <!-- Kommentarlista -->
        <ul v-if="comments.length" class="comment-list">
            <li v-for="c in comments" :key="c.id" class="comment-item">
                <div class="comment-header">
                    <strong>{{ c.name }}</strong>
                    <small>{{ formatDate(c.createdAt) }}</small>
                </div>
                <p>{{ c.comment }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CommentSection",
    props: {
        recipeId: { type: String, required: true },
    },
    data() {
        return {
            teamId: "REMOVED",
            name: "",
            comment: "",
            error: "",
            isSending: false,
            commentSent: false,
            comments: [],  // Array som håller alla kommentarer som hämtas från backend
        };
    },
    mounted() {
        this.fetchComments(); // När komponenten laddas hämtas alla kommentarer direkt
    },
    methods: {
        async fetchComments() {
            try {
                const response = await fetch( 
                    `REMOVED/${this.teamId}/recipes/${this.recipeId}/comments`
                ); 
                if (!response.ok) throw new Error(`Status: ${response.status}`);

                const text = await response.text();
                this.comments = JSON.parse(text);
            } catch (err) {
                // console.error("Kunde inte hämta kommentarer:", err);
                this.error = "Kunde inte hämta kommentarer";
            }
        },
        // Skickar en ny kommentar till backend
        async submitComment() {

            // Kontrollera att användaren fyllt i namn och kommentar
            if (!this.name.trim() || !this.comment.trim()) {
                this.error = "Du måste fylla i både namn och kommentar.";
                return;
            }

            this.error = "";
            this.isSending = true;

            try {
                const response = await fetch(
                    `REMOVED/${this.teamId}/recipes/${this.recipeId}/comments`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: this.name, comment: this.comment }),
                    }
                );

                if (!response.ok) throw new Error(`Status: ${response.status}`);

                const text = await response.text();
                const newComment = JSON.parse(text);


                // Lägg till den nya kommentaren överst i listan
                this.comments.unshift(newComment);
                // Rensa inputfält och visa tack-meddelande
                this.name = "";
                this.comment = "";
                this.commentSent = true;

                setTimeout(() => (this.commentSent = false), 3000);
            } catch (err) {
                console.error("POST failed:", err);
                this.error = "Kunde inte skicka kommentaren: " + err.message;
            } finally {
                this.isSending = false;
            }
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("sv-SE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
    },
};
</script>

<style scoped>
.comment-section {
    background: #e6f4ea;
    /* ljusgrön bakgrund */
    border-radius: 12px;
    padding: 25px;
    max-width: 600px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
    text-align: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #2e7d32;
    /* mörkgrön */
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.form-group {
    width: 100%;
    max-width: 400px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #2e7d32;
    /* grön */
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
    background-color: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 4px rgba(46, 125, 50, 0.3);
    outline: none;
}

button {
    padding: 10px 20px;
    background-color: #b71c1c;
    /* röd knapp */
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background-color: #d32f2f;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    color: #d32f2f;
    font-size: 13px;
    margin-top: 5px;
}

.success-message {
    color: #2e7d32;
    font-weight: bold;
    margin: 10px 0;
}

.comment-list {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.comment-item {
    background: #fff;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 400px;
    text-align: left;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.comment-header strong {
    color: #2e7d32;
}

.comment-header small {
    color: #555;
}

/* .delete-btn {
    background: transparent;
    border: none;
    color: #b71c1c;
    cursor: pointer;
    font-size: 12px;
} */
</style>


