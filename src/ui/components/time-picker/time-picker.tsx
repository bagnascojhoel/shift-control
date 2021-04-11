import DateTimePicker from '@react-native-community/datetimepicker';

import {InvalidRequiredPropError} from '@errors';
import { Time } from '@model';
import {DateUtils} from '@utils';

// TODO criar um jeito de definir props como required, talvez uma HOC 
export function TimePicker({
  visible,
  onChange,
  value
}: {
  visible: boolean,
  onChange: Function | ((t: Time) => void),
  value: Time
}) {
  
  if (!onChange)
    throw new InvalidRequiredPropError(`The prop 'onChange' cannot be null or undefined.`);

  return visible
   ? <DateTimePicker 
      value={DateUtils.fromTime(value)}
      onChange={(_, aDate) => onChange(new Time(aDate))}
      mode="time"
    />
    : <></>;

}