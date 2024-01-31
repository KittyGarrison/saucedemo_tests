describe('Happy Path', () => {

  it('enables the user to successfully purchase an item from PDP', () => {
    cy.visit('/');

    // Successful login navigates to the on Products page
    cy.loginWithCredentials();
    cy.location('pathname').should('equal', '/inventory.html');
    cy.get('.title').should('contain', 'Products');

    // Selecting the image navigates to the product detail page (PDP)
    cy.get('.inventory_item_img').first().click();
    cy.location('pathname').should('equal', '/inventory-item.html');

    // Adding item to cart and selecting cart icon, navigates to cart with one item
    cy.get('[data-test^=add-to-cart]').click();
    cy.get('.shopping_cart_link').click();
    cy.location('pathname').should('equal', '/cart.html');
    cy.get('.cart_list').should('have.length', 1);

    // Checkout button navigates to checkout step one
    cy.getByDataTest('checkout').click();
    cy.location('pathname').should('equal', '/checkout-step-one.html');

    // Entering valid user info and selecting continue, navigates to order summery with one item
    cy.enterUserInfo();
    cy.getByDataTest('continue').click();
    cy.location('pathname').should('equal', '/checkout-step-two.html');
    cy.get('.cart_list').should('have.length', 1);

    // Finish button navigates to checkout complete confirmation 
    cy.getByDataTest('finish').click();
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
    cy.location('pathname').should('equal', '/checkout-complete.html');

  });
})

