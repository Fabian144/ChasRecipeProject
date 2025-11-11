import RatingSection from '../components/recipe page/RatingSection.vue';

describe('Rating Component test', () => {
  beforeEach(() => {
    cy.mount(RatingSection).as('ratingSection');
  });

  it('Fills current and previous stars on hover', () => {
    cy.get('.star-container svg').eq(2).trigger('mouseover');

    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[2].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[3].icon).should('equal', 'fa-regular fa-star');
      cy.wrap(wrapper.component.starIcons[4].icon).should('equal', 'fa-regular fa-star');
    });
  });

  it('Empties stars when hovering off when none have been clicked', () => {
    cy.get('.star-container svg').eq(2).trigger('mouseover');
    cy.get('.star-container svg').eq(2).trigger('mouseleave');

    cy.get('@ratingSection').then((wrapper) => {
      wrapper.component.starIcons.forEach((star) => {
        expect(star.icon).to.equal('fa-regular fa-star');
      });
    });
  });

  it('Updates chosenRating properly when clicking a star', () => {
    cy.get('.star-container svg').eq(3).click();

    cy.get('@ratingSection').then((wrapper) => {
      expect(wrapper.component.chosenRating).to.equal(4);
    });
  });

  it('Keeps current and previous stars filled after clicking', () => {
    cy.get('.star-container svg').eq(2).click();
    cy.get('.star-container svg').eq(2).trigger('mouseleave');

    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[2].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[3].icon).should('equal', 'fa-regular fa-star');
      cy.wrap(wrapper.component.starIcons[4].icon).should('equal', 'fa-regular fa-star');
    });
  });

  it('Makes sure chosenRating stays the same after hovering over different stars', () => {
    cy.get('.star-container svg').eq(1).click();

    cy.get('.star-container svg').eq(3).trigger('mouseover');

    cy.get('.star-container svg').eq(3).trigger('mouseleave');

    cy.get('@ratingSection').then((wrapper) => {
      expect(wrapper.component.chosenRating).to.equal(2);
    });
  });

  it('Makes sure the hover effect works properly even if a star has been clicked', () => {
    cy.get('.star-container svg').eq(1).click();

    cy.get('.star-container svg').eq(3).trigger('mouseover');
    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[2].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[3].icon).should('equal', 'fa-solid fa-star');
    });

    cy.get('.star-container svg').eq(3).trigger('mouseleave');

    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[2].icon).should('equal', 'fa-regular fa-star');
      cy.wrap(wrapper.component.starIcons[3].icon).should('equal', 'fa-regular fa-star');
    });

    cy.get('.star-container svg').eq(0).trigger('mouseover');
    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-regular fa-star');
    });

    cy.get('.star-container svg').eq(0).trigger('mouseleave');

    cy.get('@ratingSection').then((wrapper) => {
      cy.wrap(wrapper.component.starIcons[0].icon).should('equal', 'fa-solid fa-star');
      cy.wrap(wrapper.component.starIcons[1].icon).should('equal', 'fa-solid fa-star');
    });
  });

  it('Sets chosenRating to 0 when clicking the same star again and empties stars', () => {
    cy.get('.star-container svg').eq(2).click();
    cy.get('.star-container svg').eq(2).trigger('mouseleave');

    cy.get('.star-container svg').eq(2).click();
    cy.get('.star-container svg').eq(2).trigger('mouseleave');
    cy.get('@ratingSection').then((wrapper) => {
      expect(wrapper.component.chosenRating).to.equal(0);
      wrapper.component.starIcons.forEach((star) => {
        expect(star.icon).to.equal('fa-regular fa-star');
      });
    });
  });

  it('Emits chosenRatingChanged event when rating changes', () => {
    const onChosenRatingChanged = cy.spy().as('ratingChanged');

    cy.mount(RatingSection, {
      props: {
        onChosenRatingChanged,
      },
    });

    cy.get('.star-container svg').eq(3).click();
    cy.get('@ratingChanged').should('have.been.calledWith', 4);
  });
});
