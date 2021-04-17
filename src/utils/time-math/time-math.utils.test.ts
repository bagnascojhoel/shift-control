import { Time24Hours } from '@model';

import { TimeMathUtils } from './time-math.utils';

describe('Model: Time', () => {
  
  it('should be 01:26 with 08:19 and 06:53', () => {
    const time08and19 = new Time24Hours('08:19');
    const time06and53 = new Time24Hours('06:53');

    const actual = TimeMathUtils.absDifference(time08and19, time06and53);

    expect(actual.toString()).toBe('01:26');
  });

  it('should be 01:26 with 08:19 and 06:53', () => {
    const time08and19 = new Time24Hours('08:19');
    const time06and53 = new Time24Hours('06:53');

    const actual = TimeMathUtils.sub(time08and19, time06and53);

    expect(actual.toString()).toBe('22:34');
  });

  it('should be 15:12 with 08:19 and 06:53', () => {
    const time08and19 = new Time24Hours('08:19');
    const time06and53 = new Time24Hours('06:53');

    const actual = TimeMathUtils.sum(time08and19, time06and53);

    expect(actual.toString()).toBe('15:12');
  });

});