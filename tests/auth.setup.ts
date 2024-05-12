import { test as setup } from '@playwright/test';
import fs from 'fs/promises';

const authFile = './.auth/user.json';

setup('authenticate via api', async ({ request }) => {
  const email = process.env.RWAPP_USER_EMAIL
  const password = process.env.RWAPP_USER_PASSWORD

  const response = await request.post('http://localhost:3001/api/users/login', {
    data: {
      "user": {
        email,
        password
      }
    }
  })

  const res = await response.json()
  const value = {
    headers: {
      Authorization: `Token ${res.user.token}`
    },
    isAuth: true,
    loggedUser: res.user
  }
  const loggedUser = {
    cookies: [],
    origins: [
      {
        origin: "http://localhost:3000",
        localStorage: [
          {
            name: "loggedUser",
            value: JSON.stringify(value)
          }
        ]
      }
    ]
  }

  await fs.writeFile(authFile, JSON.stringify(loggedUser, null, 2));
  process.env.AUTH_TOKEN = `Token ${res.user.token}`;
});
