import RatingSection from '../components/recipepage/RatingSection.vue';

describe('RatingSection component', () => {
  beforeEach(() => {
    cy.mount(RatingSection);
  });

  it('shows hover effects: stars up to hovered become filled', () => {
    cy.get('.star-container button').as('stars');

    // hover the 3rd star (index 2)
    cy.get('@stars').eq(2).trigger('mouseover');

    // first three should show filled icon (fa-solid), others regular
    cy.get('@stars').each((btn, idx) => {
      const expectation = idx <= 2 ? 'have.class' : 'not.have.class';
      if (idx <= 2) cy.wrap(btn).find('svg').should('have.class', 'fa-solid');
      else cy.wrap(btn).find('svg').should('have.class', 'fa-regular');
    });

    // leave hover => icons should revert to state based on chosenRating (none chosen => all regular)
    cy.get('@stars').eq(2).trigger('mouseleave');
    cy.get('@stars').each((btn) => {
      cy.wrap(btn).find('svg').should('have.class', 'fa-regular');
    });
  });

  it('send button appears when a star is clicked and disappears when unclicked', () => {
    cy.get('.star-container button').as('stars');

    // initially no send button
    cy.get('.send-rating-button').should('not.exist');

    // click a star => send button appears
    cy.get('@stars').eq(1).click();
    cy.get('.send-rating-button').should('be.visible').and('not.be.disabled');

    // clicking same star toggles choice off => send button removed
    cy.get('@stars').eq(1).click();
    cy.get('.send-rating-button').should('not.exist');
  });

  it('performs POST when clicking send and shows thank-you on success; disables UI after success', () => {
    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 200, body: {} }).as('postRating');

    cy.get('.star-container button').as('stars').eq(3).click(); // choose 4 stars
    cy.get('.send-rating-button').should('be.visible').click();

    cy.wait('@postRating');

    // thank-you message visible
    cy.get('.thank-you-message').should('be.visible');

    // send button and star buttons disabled after successful submit
    cy.get('.send-rating-button').should('be.disabled');
    cy.get('.star-container button').each((b) => cy.wrap(b).should('be.disabled'));
  });

  it('shows error message when POST fails and clears it when retry succeeds or when unselecting the star', () => {
    // First make the request fail
    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 500, body: {} }).as('postFail');

    cy.get('.star-container button').as('stars').eq(2).click(); // choose 3 stars
    cy.get('.send-rating-button').click();
    cy.wait('@postFail');

    // error message shown with status
    cy.get('.rating-error-message').should('be.visible').and('contain.text', 'Status: 500');

    // a) retry: stub success and click send again -> error disappears, thank-you appears
    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 200, body: {} }).as('postOk');
    cy.get('.send-rating-button').click();
    cy.wait('@postOk');

    cy.get('.rating-error-message').should('not.exist');
    cy.get('.thank-you-message').should('be.visible');
    cy.get('.send-rating-button').should('be.disabled');
    cy.get('.star-container button').each((b) => cy.wrap(b).should('be.disabled'));

    // b) simulate fresh failure then clear by unselecting the star
    // reload to reset component state
    visitPage();

    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 500, body: {} }).as('postFail2');
    cy.get('.star-container button').as('stars').eq(2).click();
    cy.get('.send-rating-button').click();
    cy.wait('@postFail2');
    cy.get('.rating-error-message').should('be.visible');

    // clicking the same star toggles chosenRating to 0 and should clear the error
    cy.get('@stars').eq(2).click();
    cy.get('.rating-error-message').should('not.exist');
    cy.get('.send-rating-button').should('not.exist');
  });
});
