import { faker } from "@faker-js/faker";
import { User, NewArticle, UserSettings } from "../types";

export default class Utils {
  public static getToken(): string {
    const authToken = process.env.AUTH_TOKEN;
    if (authToken) {
      return authToken
    } else {
      throw new Error('AUTH_TOKEN is not defined in the environment variables');
    }
  }

  public static generateNewArticleData(includeTags = true): NewArticle {
    let tagList: string[] = []
    if (includeTags) {
      tagList = [faker.lorem.word(), faker.lorem.word()]
    }
    return {
      article: {
        title: `${faker.lorem.words(5)}`,
        description: `${faker.lorem.sentence(8)}`,
        body: `${faker.lorem.paragraphs(2)}`,
        tagList: tagList
      }
    }
  }

  public static generateNewUserData(): User {
    return {
      user: {
        username: `${faker.internet.userName()}`,
        email: `${faker.internet.email()}`,
        password: `${faker.internet.password()}`
      }
    }
  }

  public static generateUserSettingsData(): UserSettings {
    return {
      image: faker.image.avatar(),
      username: faker.internet.userName(),
      bio: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  }
}
