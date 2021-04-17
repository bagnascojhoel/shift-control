import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { GradientBackground } from '../gradient-background/gradient-background';
import {Time24Hours} from '@model';
import { $V, $C } from '@global-styles';

export function TotalTimeCard({
  totalMinutes = 0,
} : {
  totalMinutes: number
}) {
  const DefaultText = <Text style={TotalTimeCardStyles.text}>Você ainda não fez nada</Text>

  return <GradientBackground style={TotalTimeCardStyles.container}>
    {
    totalMinutes === 0 ?
      DefaultText :
      <>
        <Text style={TotalTimeCardStyles.text}>
          Você fez {new Time24Hours(totalMinutes).toString()} hoje
        </Text>
      </>
    }
  </GradientBackground>
}

const Shared = StyleSheet.create({
  text: {
    color: $C.white,
    fontWeight: 'bold',
    
  }
});

const TotalTimeCardStyles = StyleSheet.create({
  container: {
    marginVertical: $V.smallGutter,
    paddingHorizontal: $V.gutter,
    paddingVertical: $V.smallGutter,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },

  time: {
    ...Shared.text,
    marginHorizontal: $V.smallGutter,
    fontSize: $V.fontSizeExtra
  },

  text: {
    ...Shared.text,
    fontSize: $V.fontSizeLarge
  }
});
