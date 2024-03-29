import { createHash } from "../../utils.js";

export default class UsersCreateDto {
  constructor(user) {
    this.first_name = user.first_name.toLowerCase();
    this.last_name = user.last_name.toLowerCase();
    this.email = user.email;
    this.password = createHash(user.password);
    this.code_technical = user.code_technical.toUpperCase();
    this.role = user.role.toLowerCase();
  }
}
