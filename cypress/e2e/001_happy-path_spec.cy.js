describe('Happy Path', () => {
  it('should redirect to the home page after successful login', () => {
    cy.visit('/');
    cy.loginWithCredentials();
    cy.location('pathname').should('equal', '/inventory.html');
    cy.get('.title').should('contain','Products')
  });
})

