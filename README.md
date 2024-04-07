# playwright-realworldapp

### Run target application

Simply run `docker-compose up -d` from the root directory of this project

### Project configuration

Create the file `.auth/user.json` on the root of this project. This is the file where user authentication data is stored on test set up, so login can be skipped for the rest of the tests. This file is already added to .gitignore, so it will not be checked in.

### Run tests

- From Playwright UI test runner: `npx playwright test --ui`
- From terminal: `npx playwright test`
