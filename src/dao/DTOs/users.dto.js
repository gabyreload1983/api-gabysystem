export default class UsersDto {
  constructor(user) {
    (this.first_name = user.first_name),
      (this.last_name = user.last_name),
      (this.email = user.email),
      (this.code_technical = user.code_technical),
      (this.role = user.role);
  }
}
