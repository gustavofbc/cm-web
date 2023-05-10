export class UserCredentialsError extends Error {
  constructor() {
    super("UserInvalidCredentials");
  }
}
