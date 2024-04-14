import { test as setup, expect } from '@playwright/test';

const authFile = './.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/#/login');
  await page.getByTestId('email').fill('cypress@realworld.com');
  await page.getByTestId('password').fill('cypress@realworld.com');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('your-feed')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });

  // Save auth token to environment variable so api requests can use it
  const localStorage = await page.evaluate(() => localStorage.getItem('loggedUser'));
  const loggedUser = JSON.parse(localStorage);
  const token = loggedUser.headers.Authorization;
  process.env.AUTH_TOKEN = token;
});

// setup('authenticate via api', async ({ request }) => {
//   const response = await request.post('http://localhost:3001/api/users/login', {
//     data: {
//       "user": {
//         "email": "cypress@realworld.com",
//         "password": "cypress@realworld.com"
//       }
//     }
//   })

//   const res = await response.json()
//   const loggedUser = {
//     cookies: [],
//     origins: [
//       {
//         origin: "http://localhost:3000",
//         localStorage: [
//           {
//             name: "loggedUser",
//             value: {
//               headers: {
//                 Authorization: `Token ${res.user.token}`
//               },
//               isAuth: true,
//               loggedUser: res.user
//             }
//           }
//         ]
//       }
//     ]
//   }
//   // await request.storageState({ path: authFile });
//   await fs.writeFile(authFile, JSON.stringify(loggedUser, null, 2));
//   const t = res.user.token;
//   process.env.AUTH_TOKEN = `Token ${res.user.token}`;
// });
