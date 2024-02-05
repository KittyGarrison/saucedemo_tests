describe('Access to cart page', () => {
  it('is denied for unauthenticated user', () => {
    // Navigate to site and login
    cy.visit('/');
    cy.loginWithCredentials();

    // Add 2 items to cart
    cy.get('[data-test^=add-to-cart]')
      .first()
      .click();
    cy.get('[data-test^=add-to-cart]')
      .first()
      .click();
      
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);

    // Logout
    cy.get('a#logout_sidebar_link').click({
      force: true,
    });

    // Access to shopping cart by url fails when logged out
    cy.visit('/cart.html', {
      failOnStatusCode: false,
    });
    cy.getByDataTest('error').should(
      'be.visible'
    );
    cy.location('pathname').should('equal', '/');
  });
});
