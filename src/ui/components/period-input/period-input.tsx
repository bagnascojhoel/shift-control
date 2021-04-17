import React, { useReducer, Reducer } from 'react';
import { View, Button, StyleProp, ViewStyle } from 'react-native';

import { Time24Hours, Period } from '@model';

import { TimePicker } from '../time-picker/time-picker';

type PeriodStateActionType = 'OPEN_START_TIME' | 'OPEN_FINISH_TIME' | 'CLOSE';
type PeriodStateAction = { type: PeriodStateActionType, period: Period, parentAction: Function };
type PeriodState = {
  isVisible: boolean,
  time: Time24Hours,
  action: Function,
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
// TODO melhorar a organização e relação deste componente com TimePicker
export function PeriodInput({
   value,
   onChange,
   ...otherProps
  }:{
    value: Period,
    onChange: (time: Period) => void,
    style: StyleProp<ViewStyle>
  }) {
  const [{isVisible, action, time}, dispatch] = useReducer<Reducer<PeriodState, PeriodStateAction>>(
    periodReducer,
    {
      isVisible: false,
      time: null,
      action: null
    }
  );

  const handleOpenPickStartTime = () => {
    dispatch({
      type: 'OPEN_START_TIME',
      parentAction: (aTime: Time24Hours) => onChange(new Period(aTime, value.end)),
      period: value
    });
  }

  const handleOpenPickFinishTime = () => {
    dispatch({
      type: 'OPEN_FINISH_TIME',
      parentAction: (aTime: Time24Hours) => onChange(new Period(value.start, aTime)),
      period: value
    });
  }
  
  const handleClosePicker = () => {
    dispatch({
      type: 'CLOSE',
      parentAction: null,
      period: null
    });
  }

  return (
    <View {...otherProps}>
      <Button title={`Started at ${value.start.toString()}`} onPress={handleOpenPickStartTime} />

      <Button title={`Ended at ${value.end.toString()}`} onPress={handleOpenPickFinishTime} />

      {
        isVisible &&
        <TimePicker
          value={time}
          onChange={action}
          onClose={handleClosePicker}
        />
      }
    </View>
  );
}
