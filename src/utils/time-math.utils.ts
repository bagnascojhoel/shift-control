import { Time } from '@model';

import { ObjectUtils } from './object.utils';

function incrementHours(aTime: Time, qty?: number): Time {
  return new Time(aTime.hours + (qty ?? 1), aTime.minutes);
}

function sum(before: Time, after: Time): Time {
  const minutesTotal = before.toMinutes() + after.toMinutes();
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;
  return new Time(hours, minutes);
}

function sub(before: Time, after: Time): Time {
  before = ObjectUtils.cloneDeep(before);
  after = ObjectUtils.cloneDeep(after);
  
  after.hours = after.isMidnight() ? 24 : after.hours;
  const minutesDifference = after.toMinutes() - before.toMinutes();
  const hours = Math.floor(minutesDifference / 60);
  const minutes = minutesDifference % 60;
  return new Time(hours, minutes); 
}

function absDifference(time1: Time, time2: Time): Time {
  const minutesDifference = Math.abs(time1.toMinutes() - time2.toMinutes());
  const hours = Math.floor(minutesDifference / 60);
  const minutes = minutesDifference % 60;
  return new Time(hours, minutes);
}

export const TimeMathUtils = {
  sum,
  sub,
  absDifference,
  incrementHours,
};