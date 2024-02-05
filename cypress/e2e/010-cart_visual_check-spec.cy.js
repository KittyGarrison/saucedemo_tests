describe('Product Detail Page', () => {
  it(`renders and captures screenshot for review`, () => {
    // Navigate to site and login
    cy.visit('/');

    cy.loginWithCredentials();
    cy.get('[data-test^=add-to-cart]').first().click();
    cy.get('[data-test^=add-to-cart]').first().click();
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);


    cy.percySnapshot('cart responsive test', { widths: [768, 992, 1200] });
  });
});
