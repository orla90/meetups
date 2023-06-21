export class Role {
  id?: number;
  name!: string;
  createdAt?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
