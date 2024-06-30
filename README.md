## Project description
The aim of this project is to showcase one way of creating an E2E test automation framework for [a web application](https://github.com/hugoguillin/realworld-app) using Playwright Test.

### Main features
- **Page Object Model**: design pattern to create a clear separation between the test code and the page code.
- **Use of [Playwright fixtures](https://playwright.dev/docs/test-fixtures)**
- **Mock request responses** to avoid heavy test setup and to be able to test different scenarios. See [example](./tests/author-detail.spec.ts#L24).
- **Reuse user authentication data between tests**. See [auth.setup.ts](./tests/auth.setup.ts).
- **Run tests in parallel in CI**. See [workflow](./.github/workflows/playwright.yml).

## How to run the tests
### Prerequisites
- Node.js (v20)
- TypeScript
- Docker
- Docker Compose

### Run target application
1. From the root directory of this project, run `docker-compose up -d` to start the target application on `http://localhost:3000`.
2. Seed the database with some data by running `docker-compose exec app npm run sqlz -- db:seed:all`.
3. Register a new user with the same credentials as in the `.env` file. If you have `curl` installed, you can run the following command:
    ```bash
    curl -X POST 'http://localhost:3000/api/users' -H 'Content-Type: application/json' -d '{"user": {"username": "playwright-user","email": "playwright@realworld.com","password": "playwright@realworld.com"}}'
    ```

### Run tests
First, install the project dependencies by running `npm install`, and the Playwright browsers by running `npx playwright install`.

Then, you can run the tests in your local machine in different ways:
- From Playwright UI test runner: `npx playwright test --ui`
- From terminal: `npx playwright test`

Or you can run the tests in parallel in CI from [Github Actions UI](https://github.com/hugoguillin/playwright-realworldapp/actions/workflows/playwright.yml) or creating a pull request.
