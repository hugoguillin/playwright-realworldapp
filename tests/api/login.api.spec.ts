import { test, expect } from '@playwright/test';

test.describe('Login API', { tag: '@api' }, () => {
  const apiUrl = `${process.env.API_URL}/users/login`;
  const username = process.env.RWAPP_USERNAME;
  const email = process.env.RWAPP_USER_EMAIL;
  const password = process.env.RWAPP_USER_PASSWORD;

  test('Login with valid credentials', async ({ request }) => {
    // Send POST request to login endpoint
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email,
          password
        }
      }
    });

    // Verify response status is 200 OK
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response contains user details
    expect(responseBody.user).toBeDefined();
    expect(responseBody.user.username).toBe(username);

    // Verify response contains JWT token
    expect(responseBody.user.token).toBeDefined();
    expect(typeof responseBody.user.token).toBe('string');
    expect(responseBody.user.token.length).toBeGreaterThan(0);
  });

  test('Login with incorrect password', async ({ request }) => {
    // Send POST request to login endpoint
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email,
          password: 'incorrect-password'
        }
      }
    });

    expect(response.status()).toBe(422);

    const responseBody = await response.json();
    expect(responseBody.errors).toBeDefined();
    expect(responseBody.errors.body).toContain("Wrong email/password combination");
  });

  test('Login with non-existent user', async ({ request }) => {
    // Send POST request to login endpoint with non-existent email
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email: 'nonexistent-user@example.com',
          password: 'any-password'
        }
      }
    });

    expect(response.status()).toBe(404);

    // Parse response body and verify error message
    const responseBody = await response.json();
    expect(responseBody.errors).toBeDefined();
    expect(responseBody.errors.body).toContain("Email not found sign in first")
  });
});
