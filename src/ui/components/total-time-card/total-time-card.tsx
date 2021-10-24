import React from 'react';
import { Box, Text } from 'native-base';
import { Time24Hours } from '@model';

export function TotalTimeCard({ totalMinutes = 0 }: { totalMinutes: number }) {
  const DefaultText = (
    <Text color="orange.500" fontWeight="bold" fontSize="3xl">
      Você ainda não tem horas registradas
    </Text>
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
