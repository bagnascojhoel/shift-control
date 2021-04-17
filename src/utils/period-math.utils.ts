import { Period, Time24Hours } from '@model';

import { TimeMathUtils } from './time-math/time-math.utils';

function calcDuration(aPeriod: Period): number {
  return TimeMathUtils.sub(aPeriod.start, aPeriod.end).toMinutes();
}

function calcDurationTime(aPeriod: Period): Time24Hours {
  return TimeMathUtils.sub(aPeriod.start, aPeriod.end);
}

export const PeriodMathUtils = {
  calcDuration,
  calcDurationTime,
};