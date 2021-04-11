import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';

import { Time, Period } from '@model';

import { TimePicker } from '../time-picker/time-picker';

type PeriodInputProps = { value: Period; onChange: (time: Period) => void };

export function PeriodInput({ value, onChange }: PeriodInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [action, setAction] = useState<Function>(null);
  const [time, setTime] = useState<Time>(new Time);

  const pickStartTime = (aTime: Time) => onChange(new Period(aTime, value.finish));

  const pickFinishTime = (aTime: Time) => onChange(new Period(value.start, aTime));

  const handleOpenPickStartTime = () => {
    const test = (t) => pickStartTime(t);
    setAction(() => test);
    setTime(value.start);
  }

  const handleOpenPickFinishTime = () => {
    const test = (t) => pickFinishTime(t);
    setAction(() => test);
    setTime(value.finish);
  }
  
  const handleOnClosePicker = () => setIsVisible(false);
  
  useEffect(() => {
    if (time && !!action)
      setIsVisible(true);
  })

// TODO criar um HOC do DateTimePicker para poder usar Time como value
  return (
    <View>
      <Button title={`Started at ${value.start.toString()}`} onPress={handleOpenPickStartTime} />

      <Button title={`Finished at ${value.finish.toString()}`} onPress={handleOpenPickFinishTime} />

      <TimePicker 
        visible={isVisible}
        value={time}
        onChange={action}
        onClose={handleOnClosePicker}
      />
    </View>
  );
}
