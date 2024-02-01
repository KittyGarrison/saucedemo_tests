describe('Login', () => {
  const validUsername = 'standard_user';
  const validPassword = 'secret_sauce';
  const userCredentials = [
    { username: '{downArrow}', password: '{downArrow}', scenarioName:'empty fields'},
    { username: '{downArrow}', password: validPassword, scenarioName:'empty username'},
    { username: validUsername, password: '{downArrow}', scenarioName:'empty password'},
    { username: validUsername, password: '1234', scenarioName:'invalid password'},
    { username: 'Kitty', password: validPassword, scenarioName:'invalid username'},
    { username: 'Kitty', password: '1234', scenarioName:'invalid username and password'},
  ];

  it(`should succeed with valid credentials`, () => {
    cy.visit('/');

    // Successful login navigates to the Products page
    cy.loginWithCredentials(validUsername, validPassword);
    cy.location('pathname').should('equal', '/inventory.html');

  });

  userCredentials.forEach((credentials) => {
    it(`should fail with error message with ${credentials.scenarioName}`, () => {
      cy.visit('/');

      cy.loginWithCredentials(credentials.username, credentials.password);

      cy.getByDataTest('error').should('be.visible')
    });
  });
});
