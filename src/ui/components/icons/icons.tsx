import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

import {
  ClockIcon,
  RemoveIcon,
  AddClockIcon,
} from '@assets';

type IconProps = { large?: boolean, style?: ImageStyle };

function BaseIcon({
  source,
  large, 
  style
} : {
  source: any, 
  large?: boolean,
  style?: ImageStyle
}) {
  return <Image
    source={source}
    style={[large ? IconStyles.large : IconStyles.small, style]}
    fadeDuration={0}
  />
}

export const Icons = {
  Clock: (p: IconProps) => <BaseIcon source={ClockIcon} {...p} />,
  Remove: (p: IconProps) => <BaseIcon source={RemoveIcon} {...p } />,
  AddClock: (p: IconProps) => <BaseIcon source={AddClockIcon} {...p} />,
};

const IconStyles = StyleSheet.create({
  small: {
    width: 30,
    height: 30
  },

  large: {
    width: 50,
    height: 50,
  }
});