import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { Time24Hours } from '@model';
import { $V, $C } from '@global-styles';

const MAX_LABEL_LENGTH = 10;

function trimLabel(aString: string): string {
  const result = aString.normalize().toUpperCase().trim();
  return result.length > MAX_LABEL_LENGTH ?
    `${result.substring(0, MAX_LABEL_LENGTH)}...` :
    result;
}

export function TimeButton({
  onPress,
  label,
  time,
  style,
}: {
  onPress: Function | (() => any),
  label: string,
  time: Time24Hours,
  style?: ViewStyle
}) {
  
  const handleOnPress = () => {
    onPress();
  }

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[TimeButtonStyles.container, style]}
    >
      <Text style={TimeButtonStyles.label}>{trimLabel(label)}</Text>
      <Text style={TimeButtonStyles.time}>{time.toString()}</Text>
    </TouchableOpacity>
  )
}

const TimeButtonStyles = StyleSheet.create({
  container: {
    margin: $V.smallGutter,
    borderBottomColor: $C.lightPurple,
    borderBottomWidth: 2,
  },
  label: {
    fontSize: $V.fontSizeSmall,
    color: $C.lightPurple
  },
  time: {
    fontSize: $V.fontSizeLarge,
    fontWeight: 'bold',
    color: $C.darkPurple
  }
});