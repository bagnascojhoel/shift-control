import React, { useReducer, Reducer, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
  onRemove: () => void;
  style: StyleProp<ViewStyle>;
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
      parentAction: (aTime: Time24Hours) =>
        onChange(new Period(aTime, value.end)),
      period: value,
    });
  };

  const handleOpenPickEndTime = () => {
    dispatch({
      type: 'OPEN_FINISH_TIME',
      parentAction: (aTime: Time24Hours) =>
        onChange(new Period(value.start, aTime)),
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
    <View {...otherProps}>
      <View style={PeriodInputStyles.container}>
        <View style={PeriodInputStyles.innerContainer}>
          <TimeButton
            label="Início"
            time={value.start}
            onPress={handleOpenPickStartTime}
            style={PeriodInputStyles.timeButton}
          />

          <TimeButton
            label="Fim"
            time={value.end}
            onPress={handleOpenPickEndTime}
            style={PeriodInputStyles.timeButton}
          />
        </View>
      </View>

      {isVisible && (
        <TimePicker
          value={time}
          onChange={action}
          onClose={handleClosePicker}
        />
      )}
    </View>
  );
}

const shared = StyleSheet.create({
  container: {
    borderRadius: 30,
  },

  leftFix: {
    paddingLeft: $V.gutter,
  },
});

const PeriodInputStyles = StyleSheet.create({
  container: {
    ...shared.container,
    marginBottom: $V.smallGutter,
    backgroundColor: $C.lightPurple,
  },

  innerContainer: {
    ...shared.container,
    ...shared.leftFix,
    paddingHorizontal: $V.smallGutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: $C.white,
    borderStyle: 'dashed',
    backgroundColor: $C.white,
  },

  timeButton: {
    marginLeft: $V.gutter,
  },

  remove: {
    right: -30,
  },

  periodTotal: {
    ...shared.leftFix,
    fontSize: $V.fontSizeSmall,
    marginTop: 2,
    marginBottom: 4,
    color: $C.darkPurple,
  },
});
