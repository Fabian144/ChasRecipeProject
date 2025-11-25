import RatingSection from '../components/recipepage/RatingSection.vue';

describe('Rating system component', () => {
  beforeEach(() => {
    cy.mount(RatingSection);
  });

  it('Tests hover effects when no star is clicked', () => {
    cy.get('.star-container button').as('stars');

    cy.get('@stars').eq(2).trigger('mouseover');
    cy.get('@stars').each((btn, idx) => {
      const svg = cy.wrap(btn);
      if (idx <= 2) svg.should('have.class', 'fa-solid');
      else svg.should('have.class', 'fa-regular');
    });

    cy.get('@stars').eq(2).trigger('mouseleave');
    cy.get('@stars').each((btn) => {
      cy.wrap(btn).should('have.class', 'fa-regular');
    });
  });

  it('Tests hover effects when a star is clicked', () => {
    cy.get('.star-container button').as('stars');

    cy.get('@stars').eq(3).click();
    cy.get('@stars').each((btn, idx) => {
      const svg = cy.wrap(btn);
      if (idx <= 3) svg.should('have.class', 'fa-solid');
      else svg.should('have.class', 'fa-regular');
    });

    cy.get('@stars').eq(1).trigger('mouseover');
    cy.get('@stars').each((btn, idx) => {
      const svg = cy.wrap(btn);
      if (idx <= 1) svg.should('have.class', 'fa-solid');
      else svg.should('have.class', 'fa-regular');
    });

    cy.get('@stars').eq(1).trigger('mouseleave');
    cy.get('@stars').each((btn, idx) => {
      const svg = cy.wrap(btn);
      if (idx <= 3) svg.should('have.class', 'fa-solid');
      else svg.should('have.class', 'fa-regular');
    });

    cy.get('@stars').eq(3).click();
    cy.get('@stars').each((btn) => {
      cy.wrap(btn).should('have.class', 'fa-regular');
    });
  });

  it('Shows a send button when a star is clicked and removes it when no stars are selected', () => {
    cy.get('.star-container button').as('stars');

    cy.get('.send-rating-button').should('not.exist');

    cy.get('@stars').eq(1).click();
    cy.get('.send-rating-button').should('be.visible').and('not.be.disabled');

    cy.get('@stars').eq(1).click();
    cy.get('.send-rating-button').should('not.exist');
  });

  it('Succeeds POST when sending rating, shows a thank you message and disables button and stars', () => {
    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 200, body: {} }).as('postRating');

    cy.get('.star-container button').as('stars').eq(3).click();
    cy.get('.send-rating-button').should('be.visible').click();

    cy.wait('@postRating');

    cy.get('.thank-you-message').should('be.visible');

    cy.get('.send-rating-button').should('be.disabled');
    cy.get('.star-container button').each((b) => cy.wrap(b).should('be.disabled'));
  });

  it('Fails POST, shows error message and removes it when retry succeeds or when no stars are selected', () => {
    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 500, body: {} }).as('postFail');

    cy.get('.star-container button').as('stars').eq(2).click(); // choose 3 stars
    cy.get('.send-rating-button').click();
    cy.wait('@postFail');

    cy.get('.rating-error-message').should('be.visible').and('contain.text', 'Status: 500');

    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 200, body: {} }).as('postOk');
    cy.get('.send-rating-button').click();
    cy.wait('@postOk');

    cy.get('.rating-error-message').should('not.exist');
    cy.get('.thank-you-message').should('be.visible');
    cy.get('.send-rating-button').should('be.disabled');
    cy.get('.star-container button').each((b) => cy.wrap(b).should('be.disabled'));

    cy.mount(RatingSection);

    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 500, body: {} }).as('postFail2');
    cy.get('.star-container button').as('stars').eq(2).click();
    cy.get('.send-rating-button').click();
    cy.wait('@postFail2');
    cy.get('.rating-error-message').should('be.visible');

    cy.get('@stars').eq(2).click();
    cy.get('.rating-error-message').should('not.exist');
    cy.get('.send-rating-button').should('not.exist');

    cy.intercept('POST', '**/recipes/*/ratings', { statusCode: 500, body: {} }).as('postFail2');
    cy.get('.star-container button').as('stars').eq(2).click();
    cy.get('.send-rating-button').click();
    cy.wait('@postFail2');
    cy.get('.rating-error-message').should('be.visible');

    cy.get('@stars').eq(2).click();
    cy.get('.rating-error-message').should('not.exist');
    cy.get('.send-rating-button').should('not.exist');
  });
});
