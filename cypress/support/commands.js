// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Custom command to select DOM elements by data-test attribute.
 * @param {string} testId - The data-test attribute value to match.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */

Cypress.Commands.add('getByDataTest', (testId) => {
  return cy.get(`[data-test=${testId}]`);
});

/**
 * Custom command to log in with provided credentials.
 * @param {string} [username='standard_user'] - The username for login. Defaults to 'standard_user'.
 * @param {string} [password='secret_sauce'] - The password for login. Defaults to 'secret_sauce'.
 */

Cypress.Commands.add(
  'loginWithCredentials',
  (username = 'standard_user', password = 'secret_sauce') => {
    cy.getByDataTest('username').type(username);
    cy.getByDataTest('password').type(password);
    cy.getByDataTest('login-button').click();
  }
);

/**
 * Custom command to enter user info with default or provided data.
 * @param {string} [firstName='Shade'] - The firstName for login. Defaults to 'Shade'.
 * @param {string} [lastName='Arbor'] - The lastName for login. Defaults to 'Arbor'.
 * @param {string} [postalCode='48226'] - The postalCode for login. Defaults to '48226'.
 */

Cypress.Commands.add(
  'enterUserInfo',
  (firstName = 'Shade', lastName = 'Arbor', postalCode = '48226') => {
    cy.getByDataTest('firstName').type(firstName);
    cy.getByDataTest('lastName').type(lastName);
    cy.getByDataTest('postalCode').type(postalCode);
  }
);