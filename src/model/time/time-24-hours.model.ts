import { TypeCheckingUtils } from '@utils';

type ComparisonFunction = (aNumber: number) => boolean;

function addPrecedingZero(aNumber: number, comparison: ComparisonFunction): string {
  return comparison(aNumber) ? `0${aNumber}` : `${aNumber}`
}

export class Time24Hours {
  private date: Date;
  
  constructor();
  constructor(value: Date);
  constructor(value: string);
  constructor(value: number);
  constructor(value: number, value1: number);
  constructor(value?: string | Date | number, value1?: number) {
    this.date = (TypeCheckingUtils.isNullOrUndefined(value)) ? Time24Hours.buildEmptyDate() :
      (value instanceof Date) ? Time24Hours.buildDateFromDate(value) :
      (typeof value === 'string' && value1 === undefined) ? Time24Hours.buildDateFromString(value) :
      (typeof value === 'number' && value1 === undefined) ? Time24Hours.buildDateFromMinutes(value) :
      (typeof value === 'number') ? Time24Hours.buildDateFromNumbers(value, value1) :
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

  private static buildDateFromNumbers(hours: number, minutes: number): Date {
    const result = new Date();
    result.setHours(hours);
    result.setMinutes(minutes);
    return result;
  }

  private static buildDateFromMinutes(minutes: number): Date {
    const result = new Date();
    result.setHours(Math.floor(minutes / 60));
    result.setMinutes(Math.floor(minutes % 60));
    return result;
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

  public isLaterThan(aTime: Time24Hours): boolean {
    return this.hours > aTime.hours || (this.hours === aTime.hours && this.minutes > aTime.minutes);
  }

  public isEqualTo(aTime: Time24Hours): boolean {
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
