describe('My First Test', () => {
  it('Rates the Pepperoni pizza recipe one star', () => {
    cy.visit("/")

		cy.get(".recipe-heading").contains("Pepperoni pizza").click()

		cy.get(".fa-regular").first().click()
  })
})