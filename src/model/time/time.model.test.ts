import { Time } from './time.model';

describe('Model: Time', () => {
  
  it('should be 01:26 with 08:19 and 06:53', () => {
    const time08and19 = new Time('08:19');
    const time06and53 = new Time('06:53');

    const actual = time08and19.sub(time06and53);

    expect(actual.toString()).toBe('01:26');
  });

  it('should be 15:12 with 08:19 and 06:53', () => {
    const time08and19 = new Time('08:19');
    const time06and53 = new Time('06:53');

    const actual = time08and19.add(time06and53);

    expect(actual.toString()).toBe('15:12');
  });

});