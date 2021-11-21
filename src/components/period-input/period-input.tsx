import React, { useReducer, Reducer, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Center } from 'native-base';

import { Time24Hours, Period } from '@model';
import { $C, $V } from '@global-styles';
import { PeriodMathUtils } from '@utils';

import { Icons } from '../icons/icons';
import { TimePicker } from '../time-picker/time-picker';
import { TimeButton } from '../time-button/time-button';

type PeriodStateActionType = 'OPEN_START_TIME' | 'OPEN_FINISH_TIME' | 'CLOSE';
type PeriodStateAction = {
  type: PeriodStateActionType;
  period: Period;
  parentAction: Function;
};
type PeriodState = {
  isVisible: boolean;
  time: Time24Hours;
  action: Function;
};

function periodReducer(state: PeriodState, action: PeriodStateAction) {
  switch (action.type) {
    case 'OPEN_START_TIME':
      return {
        isVisible: true,
        time: action.period.start,
        action: action.parentAction,
      };

    case 'OPEN_FINISH_TIME':
      return {
        isVisible: true,
        time: action.period.end,
        action: action.parentAction,
      };

    case 'CLOSE':
    default:
      return {
        isVisible: false,
        time: null,
        action: null,
      };
  }
}

export function PeriodInput({
  value,
  onChange,
  ...otherProps
}: {
  value: Period;
  onChange: (time: Period) => void;
}) {
  const [duration, setDuration] = useState<Time24Hours>(null);
  const [{ isVisible, action, time }, dispatch] = useReducer<
    Reducer<PeriodState, PeriodStateAction>
  >(periodReducer, {
    isVisible: false,
    time: null,
    action: null,
  });

  const handleOpenPickStartTime = () => {
    dispatch({
      type: 'OPEN_START_TIME',
      parentAction: (aTime: Time24Hours) => onChange(new Period(value.key, aTime, value.end)),
      period: value,
    });
  };

  const handleOpenPickEndTime = () => {
    dispatch({
      type: 'OPEN_FINISH_TIME',
      parentAction: (aTime: Time24Hours) => onChange(new Period(value.key, value.start, aTime)),
      period: value,
    });
  };

  const handleClosePicker = () => {
    dispatch({
      type: 'CLOSE',
      parentAction: null,
      period: null,
    });
  };

  useEffect(() => {
    setDuration(PeriodMathUtils.calcDurationTime(value));
  }, [value]);

  return (
    <Center {...otherProps} mt="4">
      <Box
        width="5/6"
        display="flex"
        borderRadius="md"
        bg="gray.200"
        shadow="4"
        flexDirection="row"
        justifyContent="space-around"
      >
        <TimeButton label="Início" time={value.start} onPress={handleOpenPickStartTime} />

        <TimeButton label="Fim" time={value.end} onPress={handleOpenPickEndTime} />
      </Box>

      {isVisible && <TimePicker value={time} onChange={action} onClose={handleClosePicker} />}
    </Center>
  );
}
