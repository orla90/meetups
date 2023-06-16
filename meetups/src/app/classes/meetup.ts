export class Meetup {
  id?: number;
  title = '';
  date = new Date();
  venue = '';
  shortDescription = '';
  longDescription = '';
  targetAudience = '';
  shouldBeKnown = '';
  agenda = '';
  reasonsToCome = '';
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}