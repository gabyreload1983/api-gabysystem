export default class UserUpdateDto {
  constructor(user) {
    this.first_name = user.first_name.toLowerCase();
    this.last_name = user.last_name.toLowerCase();
    this.email = user.email;
    this.code_technical = user.code_technical.toUpperCase();
    this.role = user.role.toLowerCase();
    this.imageUrl = user.imageUrl;
  }
}
