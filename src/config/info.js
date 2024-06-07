import { getPackageVersion } from "../utils.js";

const api_version = (await getPackageVersion()) || "error";

export const API_INFO = {
  version: api_version,
};
