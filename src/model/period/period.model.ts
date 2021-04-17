import { Time24Hours } from '../time/time-24-hours.model';

const HOUR_IN_MINUTES = 60;

export class Period {
  private _start: Time24Hours;

  private _end: Time24Hours;

  constructor(start?: Time24Hours, end?: Time24Hours) {
    this._start = start ?? new Time24Hours();
    this._end = end ?? new Time24Hours(this._start.toMinutes() + HOUR_IN_MINUTES);
  }

  get start(): Time24Hours {
    return this._start;
  }

  get end(): Time24Hours {
    return this._end;
  }

  public toString(): string {
    return `started at ${this._start.toString()} and finished at ${this._end.toString()}`;
  }
}
