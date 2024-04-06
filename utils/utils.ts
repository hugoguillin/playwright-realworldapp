import { faker } from "@faker-js/faker";

export default class Utils {
  public static getToken() {
    const authToken = process.env.AUTH_TOKEN;
    if (authToken) {
      return authToken
    } else {
      throw new Error('AUTH_TOKEN is not defined in the environment variables');
    }
  }

  public static generateNewArticleData(includeTags = true) {
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
}
