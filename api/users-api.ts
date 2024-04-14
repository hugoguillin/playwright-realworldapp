import { expect, APIRequestContext } from "@playwright/test"
import { User, NewUser } from "../types"

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
  public async getUser(email: string, password: string): Promise<User> {
    const loginResponse = await this.request.post(`${url}/users/login`, {
      data: {
        user: {
          email,
          password
        }
      }
    })
    expect(loginResponse).toBeOK()

    const userData = await this.request.get(`${url}/user`)
    expect(userData).toBeOK()
    return await userData.json()
  }

  public async registerNewUser(userData: NewUser): Promise<User> {
    const response = await this.request.post(`${url}/users`, {
      data: {
        user: userData.user
      }
    })
    expect(response).toBeOK()
    return await response.json()
  }
}
