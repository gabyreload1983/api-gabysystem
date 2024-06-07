import { API_INFO } from "../../config/info.js";

export default class UsersLoginDto {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.code_technical = user.code_technical;
    this.role = user.role;
    this.api_version = API_INFO.version;
    this.imageUrl = user.imageUrl;
  }
}
