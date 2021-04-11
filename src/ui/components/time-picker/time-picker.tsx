import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { InvalidRequiredPropError } from '@errors';
import { Time } from '@model';

// TODO criar um jeito de definir props como required, talvez uma HOC 
export function TimePicker({
  visible,
  onChange,
  onClose,
  value
}: {
  visible: boolean,
  onChange: Function | ((t: Time) => void),
  onClose: Function | (() => void),
  value: Time
}) {

  if (visible && !onChange) {
    throw new InvalidRequiredPropError(`The prop 'onChange' cannot be null or undefined.`);
  }

  const handleOnChange = (_, aDate) => {
    if (aDate) {
      onChange(new Time(aDate));
    }
    
    onClose();
  }

  return visible
   ? <DateTimePicker 
      value={Time.toDate(value)}
      onChange={handleOnChange}
      mode="time"
    />
    : <></>;

}