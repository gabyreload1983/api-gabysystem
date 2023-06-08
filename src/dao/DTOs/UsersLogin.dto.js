export default class UsersLoginDto {
  constructor(user) {
    (this.first_name = user.first_name.toUpperCase()),
      (this.last_name = user.last_name.toUpperCase()),
      (this.email = user.email),
      (this.code_technical = user.code_technical.toUpperCase()),
      (this.role = user.role.toLowerCase());
  }
}
