export class Meetup {
  id?: number;
  title = '';
  date: Date | string = '';
  venue = '';
  shortDescription = '';
  longDescription = '';
  targetAudience = '';
  shouldBeKnown = '';
  agenda = '';
  reasonsToCome = '';
  subscribers: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
