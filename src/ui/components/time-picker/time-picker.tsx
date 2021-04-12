import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { InvalidRequiredPropError } from '@errors';
import { Time } from '@model';

// TODO criar um jeito de definir props como required, talvez uma HOC 
export function TimePicker({
  onChange,
  onClose,
  value
}: {
  onChange: Function | ((t: Time) => void),
  onClose: Function | (() => void),
  value: Time
}) {

  if (!onChange) {
    throw new InvalidRequiredPropError(`The prop 'onChange' cannot be null or undefined.`);
  }

  const handleOnChange = (_, aDate) => {
    if (onClose)
      onClose();

    if (aDate)
      onChange(new Time(aDate));
  }

  return <DateTimePicker 
      value={Time.toDate(value)}
      onChange={handleOnChange}
      mode="time"
    />;

}