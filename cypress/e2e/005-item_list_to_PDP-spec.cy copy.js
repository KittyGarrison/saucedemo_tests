describe('Verify item titles across pages', () => {
  it('should ensure that item names match between listing and detail pages', () => {
    // Navigate to site and log in
    cy.visit('/');
    cy.loginWithCredentials();

    // in order to maintain the context of the list of items in the DOM while navigating away from the list page, a recursive function using an index and chaining .then is used.
    const checkItem = (index = 0) => {
      cy.get('.inventory_item').then((items) => {
        // Stop if there are no more items
        if (index >= items.length) {
          return;
        }

        // Extract the item name text and navigate to its details page
        cy.wrap(items[index])
          .find('.inventory_item_name')
          .as('itemName')
          .invoke('text')
          .then((itemNameText) => {

            // Click on the item name to go to the details page
            cy.get('@itemName').click();

            // Verify the item name text on the details page matches
            cy.get(
              '.inventory_details_name'
            ).should('have.text', itemNameText);

            // Navigate back to the products list and check the next item
            cy.getByDataTest('back-to-products')
              .click()
              .then(() => {
                checkItem(index + 1);
              });
          });
      });
    };

    // Start the check with the first item
    checkItem();
  });
});
