import { Time } from './Time';

export class Period {
  private startTime: Time;

  private finishTime: Time;

  constructor(start?: Time, finish?: Time) {
    this.startTime = start ?? new Time();
    this.finishTime = finish ?? new Time();
  }

  getStartDate(): Date {
    return this.startTime.toDate();
  }

  getFinishDate(): Date {
    return this.finishTime.toDate();
  }

  get start() {
    return this.startTime;
  }

  get finish() {
    return this.finishTime;
  }

  // TODO adicionar getter para duração do período
}
