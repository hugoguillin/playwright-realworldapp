export default class Utils {
  public static getToken() {
    const authToken = process.env.AUTH_TOKEN;
    if (authToken) {
      return authToken
    } else {
      throw new Error('AUTH_TOKEN is not defined in the environment variables');
    }
  }
}
