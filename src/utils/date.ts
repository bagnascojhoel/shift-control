import { Time } from '@model';

function fromTime(time: Time): Date {
  const result = new Date();
  
  result.setHours(time.hour);
  result.setMinutes(time.minute);

  return result;
}

export const DateUtils = {
  fromTime,
}
