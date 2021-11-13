import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InvalidRequiredPropError } from '@errors';
import { Time24Hours } from '@model';

export function TimePicker({
  onChange,
  onClose,
  value,
}: {
  onChange: Function | ((t: Time24Hours) => void);
  onClose: Function | (() => void);
  value: Time24Hours;
}) {
  if (!onChange) {
    throw new InvalidRequiredPropError(
      `The prop 'onChange' cannot be null or undefined.`,
    );
  }

  const handleOnChange = (_, aDate) => {
    if (onClose) onClose();

    if (aDate) onChange(new Time24Hours(aDate));
  };

  return (
    <DateTimePicker
      value={value.toDate()}
      onChange={handleOnChange}
      mode="time"
    />
  );
}
