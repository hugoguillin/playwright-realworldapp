import { expect, APIRequestContext } from "@playwright/test"
import { User, NewUser } from "../types"

const url = process.env.API_URL

export default class UsersApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  public async getUser(email: string, password: string) {
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
    const body: User = await userData.json()
    return body.user
  }

  public async registerNewUser(user: NewUser) {
    const response = await this.request.post(`${url}/users`, {
      data: {
        user
      }
    })
    expect(response).toBeOK()
    const body: User = await response.json()
    return body.user
  }
}
