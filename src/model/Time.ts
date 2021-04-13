import { TypeCheckingUtils } from '@utils';

type ComparisonFunction = (aNumber: number) => boolean;

function addPrecedingZero(aNumber: number, comparison: ComparisonFunction): string {
  return comparison(aNumber) ? `0${aNumber}` : `${aNumber}`
}

export class Time {
  private date: Date;
  
  constructor(value?: string | Date) {
    if (TypeCheckingUtils.isNullOrUndefined(value)) {
      this.date = new Date();
    } else if (value instanceof Date) {
      this.date = new Date(value);
    } else {
      TypeCheckingUtils.validateTimeString(value);
      const [hours, minutes] = value.split(':').map((v) => parseInt(v, 10));
      this.date = new Date();
      this.date.setHours(hours);
      this.date.setMinutes(minutes);
    }
  }

  public static getEmpty(): Time {
    return new Time('00:00');
  }

  public static getLatest(time1: Time, time2: Time): Time {
    return time1.isLaterThan(time2) ? time1 : time2;
  }

  public static getSoonest(time1: Time, time2: Time): Time {
    return time1.isLaterThan(time2) ? time2 : time1;
  }

  public static toDate(time: Time): Date {
    const result = new Date;
    result.setHours(parseInt(time.hour.toString()))
    result.setMinutes(parseInt(time.minute.toString()))
    return result;
  }

  public toDate(): Date {
    return Time.toDate(this);
  }

  public toString(): String {
    const minutes = addPrecedingZero(this.minute, (a) => a < 10);
    const hours = addPrecedingZero(this.hour, (a) => a < 10);
    return `${hours}:${minutes}`;
  }

  public add(aTime: Time): Time {
    const minutes = this.minute + aTime.minute;
    
    const result = new Time();
    result.hour = this.hour + aTime.hour;
    result.hour = minutes > 59 ? result.hour + Math.floor(minutes/60) : result.hour;
    result.minute = minutes % 60;
    return result;
  }

  public sub(aTime: Time): Time {
    if (this.isEqualTo(aTime))
      return new Time('00:00');

    const latest = Time.getLatest(this, aTime);
    const soonest = Time.getSoonest(this, aTime);
    const minutes = latest.minute - soonest.minute;

    const result = new Time();
    result.hour = latest.hour - soonest.hour;
    result.hour = minutes < 0 ? result.hour -1 : result.hour;
    result.minute = Math.abs(minutes);
    return result;
  }

  public isLaterThan(aTime: Time): boolean {
    return this.hour > aTime.hour || (this.hour === aTime.hour && this.minute > aTime.minute);
  }

  public isEqualTo(aTime: Time): boolean {
    return this.hour === aTime.hour && this.minute === aTime.minute;
  }

  set minute(minute: number) {  
    this.date.setMinutes(minute);
  }

  set hour(hour: number) {
    this.date.setHours(hour);
  }

  get minute(): number {
    return this.date.getMinutes();
  }

  get hour(): number {
    return this.date.getHours();
  }
}
