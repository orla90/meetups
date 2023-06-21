import { Role } from "../classes/role";

export interface AuthorizedUser {
  email: string,
  exp: number,
  iat: number,
  id: number,
  roles: Role[],
}
