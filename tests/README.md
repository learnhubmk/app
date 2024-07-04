
# End-to-end (E2E) Tests

## Introduction:
[Playwright](https://playwright.dev/) as the test runner, powered by the Chrome browser (stable channel).

## Architecture:
We follow the Page object model design pattern ([POM](https://playwright.dev/docs/pom))

- `pages` - Page objects expose atomic actions that can be perform on a specific page by interacting with the DOM. Each exposed component should perform only one action and be scenario agnostic. If any conditionals are required it should be moved to the test itself.

- `steps` - Step objects expose methods that perform a series of actions that perform a certain activity. As an example we can take a login function which is utilised across all tests. To avoid repetition we will create a reusable method that will perform the required login steps for us. The function should be scenario agnostic and just perform actions without any assertions. This allows using the function across different scenarios that require different outcomes

```typescript
async function logIn(username: string, password: string){
        await this.pages.loginPage.enterUsername();
        await this.pages.loginPage.enterPassword();
        await this.pages.loginButton.click();
}
```

- `specs` - Tests directory

- `utils` - Helper scripts around Logging and config checks.

## Viewing results

Test runs are logged both as videos and traces in the `playwright-report` folder.

## Environment Variables

Check the `.example.env` file in `./.env.examples` and create your own `.env` file from it

## Running tests:
`npm run test:e2e`
