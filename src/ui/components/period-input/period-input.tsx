import React, { useReducer, Reducer } from 'react';
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


import { Icons } from '../icons/icons';
import { TimePicker } from '../time-picker/time-picker';
import { TimeButton } from '../time-button/time-button';

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

export function PeriodInput({
   value,
   onChange,
   onRemove,
   ...otherProps
  }:{
    value: Period,
    onChange: (time: Period) => void,
    onRemove: () => void,
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

  const handleOpenPickEndTime = () => {
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

  const handleOnRemove = () => {
    onRemove();
  }

  return (
    <View {...otherProps}>
      <View style={PeriodInputStyles.container}>

        <View style={PeriodInputStyles.innerContainer}>
          <Icons.Clock />
          
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

          <TouchableOpacity style={PeriodInputStyles.remove} onPress={handleOnRemove}>
            <Icons.Remove large />
          </TouchableOpacity>
        </View>

        <Text style={PeriodInputStyles.periodTotal}>Primeiro turno durou 02:56 horas</Text>
      </View>

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

const shared = StyleSheet.create({
  container: {
    borderRadius: 30,
  },

  leftFix: {
    paddingLeft: $V.gutter,
  }
});

const PeriodInputStyles = StyleSheet.create({
  container: {
    ...shared.container,
    marginBottom: $V.smallGutter,
    backgroundColor: $C.lightPurple,
    shadowColor: $C.lightPurple,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    
    elevation: 13,
  },
  // box-shadow: 0px 4px 15px 0px #686B9E26;

  innerContainer: {
    ...shared.container,
    ...shared.leftFix,
    paddingHorizontal: $V.smallGutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: $C.lightPurple,
    backgroundColor: $C.white,
  },

  timeButton: {
    marginLeft: $V.gutter,
  },

  remove: {
    right: -35
  },

  periodTotal: {
    ...shared.leftFix,
    fontSize: $V.fontSizeSmall,
    marginBottom: 4,
    color: $C.darkPurple,
  }
});