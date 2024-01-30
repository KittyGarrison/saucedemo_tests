# saucedemo_tests
## Development Notes

### Issue
While using `$ npx cypress open` to run my initial test with Chrome, which visited the baseURL of `https://www.saucedemo.com/`, I ran into an error where the `visit` command timed out.

### Investigation
I noticed that calls to `https://events.backtrace.io` were returning a 401 error, and I assume this was blocking the `load` event from firing. Running the tests in Firefox did not yield different results. I visited [Cypress Issue #440](https://github.com/cypress-io/cypress/issues/440) and [Cypress Issue #21213](https://github.com/cypress-io/cypress/issues/21213) looking for a solution.

### Solution
Adding `chromeWebSecurity: false` to my `cypress.config.js` file resolved the issue of the `visit` command timing out. However, the 401 errors are still present.
