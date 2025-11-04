describe("Rating system", () => {
  beforeEach(() => {
    cy.visit("/recipePage.html");

    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });
  });

  it("Does not update the average rating when submitting without a comment", () => {
    cy.get(".recipe-star-container i").first().click();

    cy.get("#addComment").click();

    cy.get('@consoleLog').its('callCount').should('be.at.most', 0)
  });

  it("Updates the average rating only when a comment is added", () => {
    cy.get(".recipe-star-container i").first().click();

    cy.get("#userName").type("Cypress Tester");
    cy.get("#userComment").type("Tasty!");
    cy.get("#addComment").click();

    cy.get("@consoleLog").should("have.callCount", 1);

    cy.get("#addComment").click();
    cy.get("@consoleLog").should("have.callCount", 1);
  });
});


// Behövs i funktionen som lägger till ett nytt omdöme (addNewRating()) för att testet ska fungera på rätt sätt:
//  console.log(
// 					"This vote: " + this.addedVote,
//           "New average rating: " + recipe.rating[0].current_stars,
//           "New total votes: " + recipe.rating[1].total_votes
//         );