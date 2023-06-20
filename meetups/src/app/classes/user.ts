export class User {
  id?: number;
  email: string = '';
  password: string = '';
  fio: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
