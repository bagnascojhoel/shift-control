import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {$C} from '@global-styles'

export function GradientBackground(props) {
  return <LinearGradient
    colors={[$C.green, $C.darkPurple]}
    start={[ -0.1, -0.1]}
    end={[1, 3]}
    {...props}
    >
      {props.children}
  </LinearGradient>
};