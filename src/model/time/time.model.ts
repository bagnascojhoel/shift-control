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

  public static fromMinutes(minutes: number): Time {
    return new Time(Math.floor(minutes / 60), minutes % 60);
  }

  public static empty(): Time {
    return new Time('00:00');
  }

  public toDate(): Date {
    const result = new Date;
    result.setHours(parseInt(this.hours.toString()))
    result.setMinutes(parseInt(this.minutes.toString()))
    return result;
  }

  public toMinutes(): number {
    return this.minutes + this.hours * 60;
  }

  public toString(): string {
    const minutes = addPrecedingZero(this.minutes, (a) => a < 10);
    const hours = addPrecedingZero(this.hours, (a) => a < 10);
    return `${hours}:${minutes}`;
  }

  public isLaterThan(aTime: Time): boolean {
    return this.hours > aTime.hours || (this.hours === aTime.hours && this.minutes > aTime.minutes);
  }

  public isEqualTo(aTime: Time): boolean {
    return this.hours === aTime.hours && this.minutes === aTime.minutes;
  }

  public isMidnight(): boolean {
    return this.hours === 0;
  }

  set minutes(minute: number) {  
    this.date.setMinutes(minute);
  }

  get minutes(): number {
    return this.date.getMinutes();
  }

  set hours(hour: number) {
    this.date.setHours(hour);
  }

  get hours(): number {
    return this.date.getHours();
  }
}
