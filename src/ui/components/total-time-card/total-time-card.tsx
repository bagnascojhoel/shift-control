import React from 'react';
import { Box, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import { Time24Hours } from '@model';
import { $V, $C } from '@global-styles';

export function TotalTimeCard({ totalMinutes = 0 }: { totalMinutes: number }) {
  const DefaultText = (
    <Text style={TotalTimeCardStyles.text}>Você ainda não fez nada</Text>
  );

  return (
    <Box padding="3" alignItems="center" flexDirection="row">
      {totalMinutes === 0 ? (
        DefaultText
      ) : (
        <>
          <Text color="orange.500" fontWeight="bold" fontSize="3xl">
            Total de{' '}
            <Text color="orange.500" fontWeight="bold" fontSize="4xl">
              {new Time24Hours(totalMinutes).toString()}
            </Text>
          </Text>
        </>
      )}
    </Box>
  );
}

const Shared = StyleSheet.create({
  text: {
    color: $C.white,
    fontWeight: 'bold',
  },
});

const TotalTimeCardStyles = StyleSheet.create({
  container: {
    marginVertical: $V.smallGutter,
    paddingHorizontal: $V.gutter,
    paddingVertical: $V.smallGutter,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    ...Shared.text,
    marginHorizontal: $V.smallGutter,
    fontSize: $V.fontSizeExtra,
  },

  text: {
    ...Shared.text,
    fontSize: $V.fontSizeLarge,
  },
});
