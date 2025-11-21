describe('Rating Submission', () => {
  beforeEach(() => {
    cy.visit('/recipe/0');
  });

  it('should NOT submit rating when only rating is chosen without comment', () => {
    cy.intercept('PATCH', '**/recept.json').as('updateRating');

    cy.get('.star-container button').eq(3).click();

    cy.get('.star-container button').eq(3).find('svg').should('have.class', 'fa-star');

    cy.wait(2000);

    cy.get('@updateRating.all').should('have.length', 0);
  });

  it('should NOT submit rating when only comment is sent without rating', () => {
    cy.intercept('PATCH', '**/recept.json').as('updateRating');

    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Great recipe!');

    cy.get('button[type="submit"]').click();

    cy.contains('Tack för din kommentar!').should('be.visible');

    cy.wait(2000);

    cy.get('@updateRating.all').should('have.length', 0);
  });

  it('should submit rating when both rating is chosen AND comment is sent', () => {
    cy.intercept('PATCH', '**/recept.json', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('updateRating');

    cy.get('.star-container button').eq(4).click();

    cy.get('.star-container button').eq(4).find('svg').should('exist');

    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Excellent recipe!');

    cy.get('button[type="submit"]').click();

    cy.contains('Tack för din kommentar!').should('be.visible');

    cy.wait('@updateRating', { timeout: 5000 }).then((interception) => {

      expect(interception.request.body).to.have.property('current_stars');
      expect(interception.request.body).to.have.property('total_votes');

      expect(interception.request.body.current_stars).to.be.a('number');
      expect(interception.request.body.total_votes).to.be.a('number');
      expect(interception.request.body.total_votes).to.be.greaterThan(0);

      expect(interception.request.body.current_stars).to.be.at.least(1);
      expect(interception.request.body.current_stars).to.be.at.most(5);
    });
  });

  it('should calculate new rating correctly based on chosen star rating', () => {

    const initialRating = 4.0;
    const initialTotalVotes = 10;
    const chosenStarRating = 5; 
    const expectedNewRating = (initialRating * initialTotalVotes + chosenStarRating) / (initialTotalVotes + 1);

    cy.intercept('PATCH', '**/recept.json', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('updateRating');

    cy.get('.star-container button').eq(4).click();

    cy.get('input[placeholder="Skriv ditt namn"]').type('Another User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Love it!');
    cy.get('button[type="submit"]').click();

    cy.contains('Tack för din kommentar!').should('be.visible');

    cy.wait('@updateRating').then((interception) => {
      expect(interception.request.body.current_stars).to.be.closeTo(expectedNewRating, 0.01);
      expect(interception.request.body.total_votes).to.equal(initialTotalVotes + 1);
    });
  });

  it('should handle different star ratings correctly', () => {
    const testCases = [
      { starIndex: 0, expectedRating: 1 }, 
      { starIndex: 2, expectedRating: 3 }, 
      { starIndex: 4, expectedRating: 5 }, 
    ];

    testCases.forEach(({ starIndex, expectedRating }) => {
      cy.reload(); 

      cy.intercept('PATCH', '**/recept.json').as('updateRating');

      cy.get('.star-container button').eq(starIndex).click();

      cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
      cy.get('textarea[placeholder="Skriv din kommentar"]').type(`Testing ${expectedRating} stars`);
      cy.get('button[type="submit"]').click();

      cy.contains('Tack för din kommentar!').should('be.visible');

      cy.wait('@updateRating').then((interception) => {
        const { current_stars, total_votes } = interception.request.body;

        expect(current_stars).to.be.a('number');
        expect(total_votes).to.be.a('number');
      });
    });
  });

  it('should NOT submit if rating is clicked then unclicked (set to 0)', () => {
    cy.intercept('PATCH', '**/recept.json').as('updateRating');

    cy.get('.star-container button').eq(4).click();

    cy.get('.star-container button').eq(4).click();

    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Changed my mind!');
    cy.get('button[type="submit"]').click();

    cy.contains('Tack för din kommentar!').should('be.visible');

    cy.wait(2000);
    cy.get('@updateRating.all').should('have.length', 0);
  });
});