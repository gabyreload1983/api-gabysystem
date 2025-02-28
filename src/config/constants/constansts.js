import { SINAPSIS } from "./constSinapsis.js";
import { URBANO } from "./constUrbano.js";

export const ROLES = {
  ADMIN: "admin",
  PREMIUM: "premium",
  SELLER: "seller",
  TECHNICAL: "technical",
};

export const CONSTANTS = {
  ...SINAPSIS,
  ...URBANO,
  ...ROLES,
};
