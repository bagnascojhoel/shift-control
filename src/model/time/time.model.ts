import { TypeCheckingUtils } from '@utils';

type ComparisonFunction = (aNumber: number) => boolean;

function addPrecedingZero(aNumber: number, comparison: ComparisonFunction): string {
  return comparison(aNumber) ? `0${aNumber}` : `${aNumber}`
}

export class Time {
  private date: Date;
  
  constructor();
  constructor(value: Date);
  constructor(value: string);
  constructor(value: number, value1: number);
  constructor(value?: string | Date | number, value1?: number) {
    this.date = (TypeCheckingUtils.isNullOrUndefined(value)) ? Time.buildEmptyDate() :
      (value instanceof Date) ? Time.buildDateFromDate(value) :
      (typeof value === 'string' && value1 === undefined) ? Time.buildDateFromString(value) :
      (typeof value === 'number') ? Time.buildDateFromNumbers(value, value1) :
      null;
  }

  private static buildEmptyDate(): Date {
    return new Date();
  }

  private static buildDateFromDate(date: Date): Date {
    return new Date(date);
  }

  private static buildDateFromString(date: string): Date {
    TypeCheckingUtils.validateTimeString(date);
    const [hours, minutes] = date.split(':').map((v) => parseInt(v, 10));
    const result = new Date();
    result.setHours(hours);
    result.setMinutes(minutes);
    return result;
  }

  private static buildDateFromNumbers(hours: number, minutes: number) {
    const result = new Date();
    result.setHours(hours);
    result.setMinutes(minutes);
    return result;
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
    result.setHours(parseInt(time.hours.toString()))
    result.setMinutes(parseInt(time.minutes.toString()))
    return result;
  }

  public static toMinutes(aTime: Time): number {
    return aTime.minutes + aTime.hours * 60;
  }

  public static toString(aTime: Time): string {
    const minutes = addPrecedingZero(aTime.minutes, (a) => a < 10);
    const hours = addPrecedingZero(aTime.hours, (a) => a < 10);
    return `${hours}:${minutes}`;
  }

  public toDate(): Date {
    return Time.toDate(this);
  }

  public toMinutes(): number {
    return Time.toMinutes(this);
  }

  public toString(): string {
    return Time.toString(this);
  }

  public add(aTime: Time): Time {
    const minutesTotal = aTime.toMinutes() + this.toMinutes();
    const hours = Math.floor(minutesTotal / 60);
    const minutes = minutesTotal % 60;
    return new Time(hours, minutes);
  }

  public sub(aTime: Time): Time {
    const minutesDifference = Math.abs(aTime.toMinutes() - this.toMinutes());
    const hours = Math.floor(minutesDifference / 60);
    const minutes = minutesDifference % 60;
    return new Time(hours, minutes);
  }

  public isLaterThan(aTime: Time): boolean {
    return this.hours > aTime.hours || (this.hours === aTime.hours && this.minutes > aTime.minutes);
  }

  public isEqualTo(aTime: Time): boolean {
    return this.hours === aTime.hours && this.minutes === aTime.minutes;
  }



  set minutes(minute: number) {  
    this.date.setMinutes(minute);
  }

  set hours(hour: number) {
    this.date.setHours(hour);
  }

  get minutes(): number {
    return this.date.getMinutes();
  }

  get hours(): number {
    return this.date.getHours();
  }
}
