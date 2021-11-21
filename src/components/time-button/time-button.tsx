import React from 'react';
import { ViewStyle } from 'react-native';
import { Text, Pressable } from 'native-base';

import { Time24Hours } from '@model';

const MAX_LABEL_LENGTH = 10;

function trimLabel(aString: string): string {
  const result = aString.normalize().toUpperCase().trim();
  return result.length > MAX_LABEL_LENGTH ? `${result.substring(0, MAX_LABEL_LENGTH)}...` : result;
}

export function TimeButton({
  onPress,
  label,
  time,
  style,
}: {
  onPress: Function | (() => any);
  label: string;
  time: Time24Hours;
  style?: ViewStyle;
}) {
  const handleOnPress = () => {
    onPress();
  };

  return (
    <Pressable onPress={handleOnPress} padding="2">
      <Text fontSize="2xl" fontWeight="bold">
        {trimLabel(label)}
      </Text>
      <Text fontSize="4xl" fontWeight="bold">
        {time.toString()}
      </Text>
    </Pressable>
  );
}
