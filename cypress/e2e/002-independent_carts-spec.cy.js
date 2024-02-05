describe('User Carts', () => {
  it('is unique to users', () => {
    cy.visit('/');

    // Login with first user and reset cart
    cy.loginWithCredentials();
    cy.get('a#reset_sidebar_link').click({
      force: true,
    });

    // Validate cart is empty
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 0);

    // Logout
    cy.get('a#logout_sidebar_link').click({
      force: true,
    });

    // Login with second user add 2 items to cart
    cy.loginWithCredentials('visual_user');
    cy.addFirstItemsToCart(2);

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);

    // Logout
    cy.get('a#logout_sidebar_link').click({
      force: true,
    });

    // Login with first user and validate cart is empty
    cy.loginWithCredentials();
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 0);
  });
});
