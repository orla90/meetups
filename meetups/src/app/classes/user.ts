import { Role } from "./role";

export class User {
  id!: number;
  email: string = '';
  password: string = '';
  fio: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  roles: Role[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
