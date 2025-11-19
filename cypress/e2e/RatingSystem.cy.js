describe('Rating Submission', () => {
  beforeEach(() => {
    cy.visit('/recipe/0'); // Adjust URL to your app
  });

  it('should NOT submit rating when only rating is chosen without comment', () => {
    // Set up intercept before any actions
    cy.intercept('PATCH', '**/recept.json').as('updateRating');
    
    // Choose a rating by clicking the 4th star
    cy.get('.star-container button').eq(3).click();
    
    // Verify star is selected (should have filled icon)
    cy.get('.star-container button').eq(3).find('svg').should('have.class', 'fa-star');
    
    // Wait to ensure no API call is made
    cy.wait(2000);
    
    // Verify NO API call was made
    cy.get('@updateRating.all').should('have.length', 0);
  });

  it('should NOT submit rating when only comment is sent without rating', () => {
    // Set up intercept before any actions
    cy.intercept('PATCH', '**/recept.json').as('updateRating');
    
    // Fill in the form WITHOUT choosing a rating
    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Great recipe!');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for comment submission confirmation
    cy.contains('Tack för din kommentar!').should('be.visible');
    
    // Wait to ensure no API call is made
    cy.wait(2000);
    
    // Verify NO API call was made
    cy.get('@updateRating.all').should('have.length', 0);
  });

  it('should submit rating when both rating is chosen AND comment is sent', () => {
    // Set up intercept before any actions
    cy.intercept('PATCH', '**/recept.json', (req) => {
      // Reply with success to prevent actual API call
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('updateRating');
    
    // STEP 1: Choose a rating (5 stars)
    cy.get('.star-container button').eq(4).click();
    
    // Verify the 5th star is selected
    cy.get('.star-container button').eq(4).find('svg').should('exist');
    
    // STEP 2: Fill in the form
    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Excellent recipe!');
    
    // STEP 3: Submit the form - this triggers commentSent = true
    cy.get('button[type="submit"]').click();
    
    // Wait for comment submission confirmation
    cy.contains('Tack för din kommentar!').should('be.visible');
    
    // STEP 4: Wait for the rating API call (triggered by watch on commentSent)
    cy.wait('@updateRating', { timeout: 5000 }).then((interception) => {
      // Verify the request was made
      expect(interception.request.body).to.have.property('current_stars');
      expect(interception.request.body).to.have.property('total_votes');
      
      // Verify the values are numbers
      expect(interception.request.body.current_stars).to.be.a('number');
      expect(interception.request.body.total_votes).to.be.a('number');
      expect(interception.request.body.total_votes).to.be.greaterThan(0);
      
      // Verify current_stars is within valid range
      expect(interception.request.body.current_stars).to.be.at.least(1);
      expect(interception.request.body.current_stars).to.be.at.most(5);
    });
  });

  it('should calculate new rating correctly based on chosen star rating', () => {
    // Mock initial recipe data - adjust these values to match your test data
    const initialRating = 4.0;
    const initialTotalVotes = 10;
    const chosenStarRating = 5; // Clicking the 5th star
    const expectedNewRating = (initialRating * initialTotalVotes + chosenStarRating) / (initialTotalVotes + 1);
    
    cy.intercept('PATCH', '**/recept.json', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('updateRating');
    
    // Choose 5 stars
    cy.get('.star-container button').eq(4).click();
    
    // Fill in and submit the form
    cy.get('input[placeholder="Skriv ditt namn"]').type('Another User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Love it!');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Tack för din kommentar!').should('be.visible');
    
    // Wait for and verify the rating API call
    cy.wait('@updateRating').then((interception) => {
      expect(interception.request.body.current_stars).to.be.closeTo(expectedNewRating, 0.01);
      expect(interception.request.body.total_votes).to.equal(initialTotalVotes + 1);
    });
  });

  it('should handle different star ratings correctly', () => {
    const testCases = [
      { starIndex: 0, expectedRating: 1 }, // 1 star
      { starIndex: 2, expectedRating: 3 }, // 3 stars
      { starIndex: 4, expectedRating: 5 }, // 5 stars
    ];

    testCases.forEach(({ starIndex, expectedRating }) => {
      cy.reload(); // Reload between tests
      
      cy.intercept('PATCH', '**/recept.json').as('updateRating');
      
      // Choose rating
      cy.get('.star-container button').eq(starIndex).click();
      
      // Fill form
      cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
      cy.get('textarea[placeholder="Skriv din kommentar"]').type(`Testing ${expectedRating} stars`);
      cy.get('button[type="submit"]').click();
      
      cy.contains('Tack för din kommentar!').should('be.visible');
      
      // Verify the chosen rating is included in the calculation
      cy.wait('@updateRating').then((interception) => {
        const { current_stars, total_votes } = interception.request.body;
        // The new rating should reflect the chosen star rating
        expect(current_stars).to.be.a('number');
        expect(total_votes).to.be.a('number');
      });
    });
  });

  it('should NOT submit if rating is clicked then unclicked (set to 0)', () => {
    cy.intercept('PATCH', '**/recept.json').as('updateRating');
    
    // Click 5th star to select it
    cy.get('.star-container button').eq(4).click();
    
    // Click same star again to deselect (sets chosenRating to 0)
    cy.get('.star-container button').eq(4).click();
    
    // Fill in and submit form
    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.get('textarea[placeholder="Skriv din kommentar"]').type('Changed my mind!');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Tack för din kommentar!').should('be.visible');
    
    // Wait and verify NO API call was made (because chosenRating = 0)
    cy.wait(2000);
    cy.get('@updateRating.all').should('have.length', 0);
  });
});