import { Time24Hours } from '../time24Hours/time-24-hours.model';

const HOUR_IN_MINUTES = 60;

export class Period {
  private _key: number;
  private _start: Time24Hours;
  private _end: Time24Hours;

  constructor(key?: number, start?: Time24Hours, end?: Time24Hours) {
    this._key = key ?? 0;
    this._start = start ?? new Time24Hours();
    this._end = end ?? new Time24Hours(this._start.toMinutes() + HOUR_IN_MINUTES);
  }

  set key(key: number) {
    this._key = key;
  }

  get key(): number {
    return this._key;
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

  public static buildNextFrom(period: Period): Period {
    const result = new Period(period.end);

    result.key = period.key + 1;

    return result;
  }
}
