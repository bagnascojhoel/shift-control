import { Time } from '../time/time.model';

export class Period {
  private _start: Time;

  private _finish: Time;

  constructor(start?: Time, finish?: Time) {
    this._start = start ?? new Time();
    this._finish = finish ?? new Time();
  }

  get start(): Time {
    return this._start;
  }

  get finish(): Time {
    return this._finish;
  }

  get duration(): Time {
    return this._finish.sub(this._start);
  }

  public toString(): string {
    return `started at ${this._start.toString()} and finished at ${this._finish.toString()}`;
  }
}
