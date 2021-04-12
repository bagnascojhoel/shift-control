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

  public toDate(): Date {
    return Time.toDate(this);
  }

  public toString(): String {
    const minutes = addPrecedingZero(this.minute, (a) => a < 10);
    const hours = addPrecedingZero(this.hour, (a) => a < 10);
    return `${hours}:${minutes}`;
  }

  public add(aTime: Time): Time {
    const result = new Time();
    const minutes = this.minute + aTime.minute;
    result.hour = this.hour + aTime.hour;
    result.hour = minutes > 59 ? result.hour + Math.floor(minutes/60) : result.hour;
    result.minute = minutes % 60;
    
    return result;
  }

  // TODO adicionar funções de subtração

  public static toDate(time: Time): Date {
    const result = new Date;
    result.setHours(parseInt(time.hour.toString()))
    result.setMinutes(parseInt(time.minute.toString()))
    return result;
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
