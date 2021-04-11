import { TypeCheckingUtils } from '@utils';

type ComparisonFunction = (aNumber: number) => boolean;

function addPrecedingZero(aNumber: number, comparison: ComparisonFunction): string {
  return comparison(aNumber) ? `0${aNumber}` : `${aNumber}`
}

export class Time {
  private date: Date;
  
  constructor(date?: string | Date) {
    if (TypeCheckingUtils.isNullOrUndefined(date)) {
      this.date = new Date();
    } else {
      this.date = new Date(date);
    }
  }

  public toDate(): Date {
    return Time.toDate(this);
  }

  public toString(): String {
    const minutes = addPrecedingZero(this.minute, (a) => a < 10);
    const hours = addPrecedingZero(this.hour, (a) => a < 10);
    return `${hours}:${minutes}`;
  }

  public static toDate(time: Time): Date {
    const result = new Date;
    result.setHours(parseInt(time.hour.toString()))
    result.setMinutes(parseInt(time.minute.toString()))
    return result;
  }

  set minute(minute: number) {
    if (this.date !== null)
      this.date = new Date();
  
    this.date.setMinutes(minute);
  }

  set hour(hour: number) {
    if (this.date !== null)
      this.date = new Date();

    this.date.setHours(hour);
  }

  get minute() {
    return this.date.getMinutes();
  }

  get hour() {
    return this.date.getHours();
  }
}
