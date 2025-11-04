import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const ratingSectionComponent = createApp({
  data() {
    return {
      recipes,
      chosenRating: 0,
      commentAmount: document.querySelectorAll("#commentList > .comment").length,
      starIcons: [
        { voteValue: 1, class: `${this.emptyStar()}` },
        { voteValue: 2, class: `${this.emptyStar()}` },
        { voteValue: 3, class: `${this.emptyStar()}` },
        { voteValue: 4, class: `${this.emptyStar()}` },
        { voteValue: 5, class: `${this.emptyStar()}` },
      ],
    };
  },

  methods: {
    emptyStar() {
      return "fa-regular fa-star fa-xl";
    },

    filledStar() {
      return "fa-solid fa-star fa-xl";
    },

    hoverStars(chosenStar) {
      this.starIcons.forEach((starIcon) => {
        if (starIcon.voteValue <= chosenStar.voteValue && this.chosenRating === 0) {
          starIcon.class = this.filledStar();
        } else if (starIcon.voteValue > chosenStar.voteValue && this.chosenRating === 0) {
          starIcon.class = this.emptyStar();
        }
      });
    },

    hoverStarsOff() {
      if (this.chosenRating === 0) {
        this.starIcons.forEach((starIcon) => {
          starIcon.class = this.emptyStar();
        });
      }
    },

    changeChosenRating(chosenStar) {
      if (this.chosenRating !== chosenStar.voteValue) {
        this.chosenRating = chosenStar.voteValue;

        this.starIcons.forEach((starIcon) => {
          if (starIcon.voteValue <= this.chosenRating) {
            starIcon.class = this.filledStar();
          } else {
            starIcon.class = this.emptyStar();
          }
        });
      } else {
        this.chosenRating = 0;
        this.starIcons.forEach((starIcon) => {
          starIcon.class = this.emptyStar();
        });
      }
    },

    addNewRating() {
      const newCommentAmount = document.querySelectorAll("#commentList > .comment").length;

      if (this.chosenRating > 0 && newCommentAmount > this.commentAmount) {
        const recipeHeading = document.querySelector(".recipe-title").innerText;
        const recipe = this.recipeBasedOffHeading(recipeHeading);
        console.log("This vote: " + this.chosenRating);

        let currentRating = recipe.rating.current_stars;
        let currentVotes = recipe.rating.total_votes;

        const newRating = (currentRating * currentVotes + this.chosenRating) / (currentVotes + 1);

        this.appendNewRatingAndVotes(recipe, newRating);
        console.log(
          "New average rating: " + recipe.rating.current_stars,
          "New total votes: " + recipe.rating.total_votes
        );

        this.commentAmount = document.querySelectorAll("#commentList > .comment").length;
      }
    },

    recipeBasedOffHeading(recipeHeading) {
      return this.recipes.filter((recipe) => recipe.name === recipeHeading)[0];
    },

    appendNewRatingAndVotes(recipe, newRating) {
      recipe.rating.current_stars = newRating;
      recipe.rating.total_votes++;
    },
  },

  mounted() {
    const commentButton = document.querySelector("#addComment");
    commentButton.addEventListener("click", this.addNewRating);
  },
});

ratingSectionComponent.mount("#rating-section");
