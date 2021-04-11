import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Time, Period, PeriodTimeType } from '@model';

type PeriodInputProps = { value: Period; onChange: (time: Period) => void };
export function PeriodInput({ value, onChange }: PeriodInputProps) {
  const [isStartPickerEnabled, setIsStartPickerEnabled] = useState<boolean>(false);
  const [isFinishPickerEnabled, setIsFinishPickerEnabled] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(
    isStartPickerEnabled || isFinishPickerEnabled,
  );
  const [pickerDate, setPickerDate] = useState<{ value: Date; action: Function }>();

  const updatePickerVisibility = () => setShowPicker(isStartPickerEnabled || isFinishPickerEnabled);

  useEffect(() => {
    if (isStartPickerEnabled) {
      setIsFinishPickerEnabled(false);
      setPickerDate({
        value: value.getStartDate(),
        action: handlePickStartDate,
      });
    }

    updatePickerVisibility();
  }, [isStartPickerEnabled]);

  useEffect(() => {
    if (isFinishPickerEnabled) {
      setIsStartPickerEnabled(false);
      setPickerDate({
        value: value.getFinishDate(),
        action: handlePickFinishDate,
      });
    }

    updatePickerVisibility();
  }, [isFinishPickerEnabled]);

  const handlePickTime = (newTime: Time, timeType) => {
    const { start, finish } = value;

    let newPeriod;
    if (timeType === PeriodTimeType.START) 
      newPeriod = new Period(newTime, finish);
    else if (timeType === PeriodTimeType.FINISH)
      newPeriod = new Period(start, newTime);

    onChange(newPeriod);
  };

  const handlePickStartDate = (aDate: Date) => {
    handlePickTime(new Time(aDate), PeriodTimeType.START);
  };

  const handlePickFinishDate = (aDate: Date) => {
    handlePickTime(new Time(aDate), PeriodTimeType.FINISH);
  };

  const handleOpenPickStartTime = () => setIsStartPickerEnabled(true);

  const handleOpenPickFinishTime = () => setIsFinishPickerEnabled(true);
// TODO criar um HOC do DateTimePicker para poder usar Time como value
  return (
    <View>
      <Button title={`Started at ${value.start.toString()}`} onPress={handleOpenPickStartTime} />

      <Button title={`Finished at ${value.finish.toString()}`} onPress={handleOpenPickFinishTime} />

      {showPicker && (
        <DateTimePicker
          value={pickerDate.value}
          onChange={(_, aDate) => pickerDate.action(aDate)}
          mode="time"
        />
      )}
    </View>
  );
}
