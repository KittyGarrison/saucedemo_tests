# saucedemo_tests

This project is a demo of a few automated tests written in [Cypress](https://www.cypress.io/) with a [Percy](https://percy.io/) integration. The target of these tests is the website [Swag Labs](https://www.saucedemo.com/), a dummy site published by [SauceLabs](https://saucelabs.com/) for the purpose of trying out automated testing tools.

## Getting Started

Here are some instructions to guide you through setting up the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
- [Percy Account and Token](https://percy.io/)

### Installation

1. **Clone the project** (if you haven't already):

   ```
   git@github.com:KittyGarrison/saucedemo_tests.git
   cd saucedemo_tests
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

### Configure Environment Variables for Percy

| Environment              | Method    | Command                                                            | Scope          |
| ------------------------ | --------- | ------------------------------------------------------------------ | -------------- |
| **macOS/Linux**          | Temporary | `export PERCY_TOKEN=[your token]`                                  | Single session |
| **macOS/Linux**          | Permanent | Add `export PERCY_TOKEN=[your token]` to `~/.bashrc` or `~/.zshrc` | All sessions   |
| **Windows** (CMD)        | Permanent | `setx PERCY_TOKEN "[your token]"`                                  | All sessions   |
| **Windows** (PowerShell) | Permanent | `$env:PERCY_TOKEN="[your token]"`                                  | All sessions   |

### Running Tests

Refer to the **Project Scripts** section of this README for commands to run tests using Cypress and Percy.

### Viewing Test Results

- **Cypress**: Test results are displayed in the terminal or the Cypress Test Runner UI.
- **Percy**: Visual test results can be viewed on your Percy dashboard.

## Project Scripts

Available npm run scripts for this project:

| Command    | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `cypress`  | Shows Cypress help options.                                             |
| `cy:open`  | Opens Cypress in interactive mode.                                      |
| `cy:run`   | Runs Cypress tests from the command line.                               |
| `cy:view`  | Runs Cypress tests in headed mode without exiting after tests complete. |
| `cy:percy` | Runs Cypress tests and sends snapshots to Percy.                        |

## Development Notes

### Issue

While using `$ npx cypress open` to run my initial test with Chrome, which visited the baseURL of `https://www.saucedemo.com/`, I ran into an error where the `visit` command timed out.

### Investigation

I noticed that calls to `https://events.backtrace.io` were returning a 401 error, and I assume this was blocking the `load` event from firing. Running the tests in Firefox did not yield different results. I visited [Cypress Issue #440](https://github.com/cypress-io/cypress/issues/440) and [Cypress Issue #21213](https://github.com/cypress-io/cypress/issues/21213) looking for a solution.

### Solution

Adding `chromeWebSecurity: false` to my `cypress.config.js` file resolved the issue of the `visit` command timing out. However, the 401 errors are still present.

### Development Notes

#### Issue: Cypress Test Timeout

While using `$ npx cypress open` to run my initial test with Chrome, which visited the baseURL of `https://www.saucedemo.com/`, I encountered a timeout error on the `visit` command.

#### Debugging Steps

| Step                                                             | Details                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| Reviewed Cypress and browser console logs. | |
| Checked network activity for failed requests. | Calls to https://events.backtrace.io were returning a 401 error. |
| Consulted Cypress documentation for `cy.visit()`. | This led me to believe that the 401s were blocking the `load` event. |
| Googled GitHub issues for similar problems.| |

#### Considered Alternatives

| Alternative | Result | Notes |
| --| -- | -- |
| Increasing the default timeout setting in Cypress. | Did not work. | |
| Switching browsers from Chrome to Firefox.         | Did not work. | |
| Switching to a headless browser for testing.       | Worked.       | Maybe because it ran in Electron? |

#### Chosen Solution:

Added `chromeWebSecurity: false` to `cypress.config.js`. This solution was chosen based on recommendations found in [GIthub Issue #21213](https://github.com/cypress-io/cypress/issues/21213).

#### Results:

Resolved the timeout issue, allowing Cypress tests to run in interactive mode. However, the 401 errors can still be seen in the cypress logs.

#### Lessons Learned:

Gained a deeper understanding of how the Cypress visit command functions.

#### Future Considerations:

- Study the `chromeWebSecurity` setting for more context.
- Monitor for any unintended side effects of disabling `chromeWebSecurity`.
- Investigate the solution for FireFox and why headless runs worked without the added security configuration.
