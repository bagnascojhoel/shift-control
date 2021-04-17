import { Period } from '@model';

import { TimeMathUtils } from './time-math/time-math.utils';

function calcDuration(aPeriod: Period): number {
  return TimeMathUtils.sub(aPeriod.start, aPeriod.end).toMinutes();
}

export const PeriodMathUtils = {
  calcDuration,
};