import { User } from "./user";

export class Meetup {
  id?: number;
  name: string = '';
  description: string = '';
  location: string = '';
  target_audience: string = '';
  need_to_know: string = '';
  will_happen: string = '';
  reason_to_come: string = ''
  time: string = '';
  duration!: number;
  createdBy!: number;
  owner!: User;
  users: User[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
