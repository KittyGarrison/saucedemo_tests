describe('Product Detail Page', () => {
  it(`renders and captures screenshot for review`, () => {
    // Navigate to site and login
    cy.visit('/');
    cy.loginWithCredentials();

    cy.get('.inventory_list').should('exist');
    cy.percySnapshot('PDP responsive test', {
      widths: [768, 992, 1200],
    });
  });
});
