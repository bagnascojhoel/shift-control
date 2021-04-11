import React from 'react';
import { Text } from 'react-native';
import { Common } from '@global-styles';

export function Label({ children: string }) {
  return <Text style={Common.label}>{children}</Text>;
}
