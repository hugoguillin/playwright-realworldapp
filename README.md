# playwright-realworldapp

### Run target application

Simply run `docker-compose up -d` from the root directory of this project. This will start the target application on `http://localhost:3000`. Then, you need register a new user with the same credentials as in the `.env` file.

### Run tests

- From Playwright UI test runner: `npx playwright test --ui`
- From terminal: `npx playwright test`
