import { User } from "./user";

export class Meetup {
  id?: number;
  name: string | null= '';
  description: string = '';
  time: string | Date= '';
  duration?: number;
  location: string | null = '';
  target_audience: string | null = '';
  need_to_know: string | null = '';
  will_happen: string | null = '';
  reason_to_come: string | null = '';
  createdBy?: number;
  owner?: User;
  users?: User[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
