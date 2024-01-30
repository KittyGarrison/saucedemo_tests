describe('Happy Path', () => {
  it('Logs in', () => {
    cy.visit("/")
    cy.get(".login_logo", { timeout: 20000 }).should("be.visible");
    cy.location("pathname").should("equal", "/");
  })
})

