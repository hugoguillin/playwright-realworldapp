import { expect, APIRequestContext } from "@playwright/test"
import { UserProfile, User } from "../types"

const url = process.env.API_URL

export default class UsersApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  /**
   * Get current user data.
   * Perform login first, in case user data was updated
   * @returns A user object containing the user data
   */
  public async getUser(userData: User): Promise<UserProfile> {
    const loginResponse = await this.request.post(`${url}/users/login`, {
      data: {
        user: {
          email: userData.user.email,
          password: userData.user.password
        }
      }
    })
    expect(loginResponse).toBeOK()
    const loginBody = await loginResponse.json()

    const userResponse = await this.request.get(`${url}/user`, {
      headers: {
        Authorization: `Token ${loginBody.user.token}`
      }
    })
    expect(userResponse).toBeOK()
    return await userResponse.json()
  }

  /**
   * Register a new user in the application
   * @param userData - The user data to register
   * @returns A user object containing the user profile
   */
  public async registerNewUser(userData: User): Promise<UserProfile> {
    const response = await this.request.post(`${url}/users`, {
      data: {
        user: userData.user
      }
    })
    expect(response).toBeOK()
    return await response.json()
  }
}
