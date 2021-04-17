import { InvalidTimeStringError } from '@errors';

function isNullOrUndefined(any: any) {
  return Object.is(any, null) || Object.is(any, undefined); 
}

function validateTimeString(aString: string): void {
  if (aString.indexOf(':') === -1)
    throw new InvalidTimeStringError('The time string must follow the pattern: XX:XX.');

  const [hours, minutes] = aString.split(':').map(parseInt);

  if (hours < 0 || hours > 23)
    throw new InvalidTimeStringError('The time string must have hours between 0 and 23.');
  else if (minutes < 0 || minutes > 59) 
    throw new InvalidTimeStringError('The time string must have minutes between 0 and 59.');
}

export const TypeCheckingUtils = {
  isNullOrUndefined,
  validateTimeString,
}