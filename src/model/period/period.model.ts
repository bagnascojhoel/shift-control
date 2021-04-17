import { TimeMathUtils } from '@utils';

import { Time } from '../time/time.model';

export class Period {
  private _start: Time;

  private _end: Time;

  constructor(start?: Time, end?: Time) {
    this._start = start ?? new Time();
    this._end = end ?? TimeMathUtils.incrementHours(this._start);
  }

  get start(): Time {
    return this._start;
  }

  get end(): Time {
    return this._end;
  }

  public toString(): string {
    return `started at ${this._start.toString()} and finished at ${this._end.toString()}`;
  }
}
