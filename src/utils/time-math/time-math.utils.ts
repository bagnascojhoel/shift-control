import { Time24Hours } from '@model';

const A_DAY_IN_MINUTES = 1440;

function incrementHours(aTime: Time24Hours, qty?: number): Time24Hours {
  return new Time24Hours(aTime.hours + (qty ?? 1), aTime.minutes);
}

function sum(before: Time24Hours, after: Time24Hours): Time24Hours {
  const minutesTotal = before.toMinutes() + after.toMinutes();
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;
  return new Time24Hours(hours, minutes);''
}

function sub(before: Time24Hours, after: Time24Hours): Time24Hours {
  let afterMinutes = after.toMinutes();
  afterMinutes = after.isMidnight() ? A_DAY_IN_MINUTES : afterMinutes;
  afterMinutes = before.isLaterThan(after) ? afterMinutes + A_DAY_IN_MINUTES : afterMinutes;
  const minutesDifference = afterMinutes - before.toMinutes();
  const hours = Math.floor(minutesDifference / 60);
  const minutes = minutesDifference % 60;
  return new Time24Hours(hours, minutes); 
}

function absDifference(time1: Time24Hours, time2: Time24Hours): Time24Hours {
  const minutesDifference = Math.abs(time1.toMinutes() - time2.toMinutes());
  const hours = Math.floor(minutesDifference / 60);
  const minutes = minutesDifference % 60;
  return new Time24Hours(hours, minutes);
}

export const TimeMathUtils = {
  sum,
  sub,
  absDifference,
  incrementHours,
};