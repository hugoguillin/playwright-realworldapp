import { test, expect } from '@playwright/test';

test.describe('Login API', { tag: '@api' }, () => {
  const apiUrl = `${process.env.API_URL}/users/login`;
  const username = process.env.RWAPP_USERNAME;
  const email = process.env.RWAPP_USER_EMAIL;
  const password = process.env.RWAPP_USER_PASSWORD;

  test('Login with valid credentials', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email,
          password
        }
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.user).toBeDefined();
    expect(responseBody.user.username).toBe(username);
    expect(responseBody.user.token).toBeDefined();
    expect(typeof responseBody.user.token).toBe('string');
    expect(responseBody.user.token.length).toBeGreaterThan(0);
  });

  test('Login with incorrect password', async ({ request }) => {
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
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email: 'nonexistent-user@example.com',
          password: 'any-password'
        }
      }
    });

    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.errors).toBeDefined();
    expect(responseBody.errors.body).toContain("Email not found sign in first")
  });

  test('Login with missing email or password', async ({ request }) => {
    // Test with missing email
    const responseWithoutEmail = await request.post(apiUrl, {
      data: {
        user: {
          password: 'any-password'
        }
      }
    });

    expect(responseWithoutEmail.status()).toBe(422);
    const responseBodyWithoutEmail = await responseWithoutEmail.json();
    expect(responseBodyWithoutEmail.errors.body).toContain("Email is required")

    // Test with missing password
    const responseWithoutPassword = await request.post(apiUrl, {
      data: {
        user: {
          email: 'test@example.com'
        }
      }
    });

    expect(responseWithoutPassword.status()).toBe(422);
    const responseBodyWithoutPassword = await responseWithoutPassword.json();
    expect(responseBodyWithoutPassword.errors.body).toContain("Password is required")
  });

  test('Login with invalid email format', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email: 'invalid-email-format',
          password: 'any-password'
        }
      }
    });

    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody.errors.body).toContain("Invalid email format");
  });

  test('Verify JWT token structure on login', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email,
          password
        }
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    const token = responseBody.user.token;
    expect(token).toBeDefined();

    // Verify token follows JWT format (three parts separated by periods)
    const tokenParts = token.split('.');
    expect(tokenParts.length).toBe(3);

    // Verify each part is base64 encoded (can be decoded)
    tokenParts.forEach((part, index) => {
      // The signature part (index 2) might contain non-base64 URL safe characters
      if (index < 2) {
        try {
          const decoded = Buffer.from(part, 'base64').toString();
          expect(decoded.length).toBeGreaterThan(0);

          // Header and payload should be valid JSON
          const parsedJson = JSON.parse(decoded);
          expect(parsedJson).toBeTruthy();
        } catch (e) {
          expect(e).toBeNull(); // This will fail the test if decoding fails
        }
      }
    });
  });

  test('Attempt login with SQL injection attempt', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: {
        user: {
          email,
          password: "' OR '1'='1"
        }
      }
    });

    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody.errors.body).toContain("Wrong email/password combination");
  });
});
