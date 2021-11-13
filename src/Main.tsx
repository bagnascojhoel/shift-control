import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Box, Text, Center, useToast, Button } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import { $V } from '@global-styles';
import { Period } from '@model';
import { TotalTimeCard, AddPeriodButton } from '@components';
import { PeriodMathUtils } from '@utils';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  const handleAddPeriod = () => {
    const lastPeriod = periods[periods.length - 1];
    const nextPeriod = lastPeriod
      ? Period.buildNextFrom(lastPeriod)
      : new Period();

    setPeriods([...periods, nextPeriod]);
  };

  const handleSwipeValueChange = ({ key, value }) => {
    if (value < -Dimensions.get('window').width) {
      const remainingPeriods = periods.filter((period) => period.key !== key);
      setPeriods(remainingPeriods);
    }
  };

  useEffect(() => {
    const total = periods.reduce(
      (totalMinutes, period) =>
        totalMinutes + PeriodMathUtils.calcDuration(period),
      0,
    );
    setTotalMinutes(total);
  }, [periods]);

  return (
    <>
      <StatusBar />
      <Center boxSize="full">
        <TotalTimeCard totalMinutes={totalMinutes} />

        <SwipeListView
          disableRightSwipe
          style={MainStyles.periodList}
          data={periods}
          onSwipeValueChange={handleSwipeValueChange}
          renderItem={renderPeriodInput}
          rightOpenValue={-Dimensions.get('window').width}
          renderHiddenItem={(data) => <></>}
        />
        <AddPeriodButton onPress={handleAddPeriod} />
      </Center>
    </>
  );
}

function renderPeriodInput({ item: period }) {
  return (
    <Box key={period.id} bg="amber.200" width="full" height="20">
      <Text fontSize="xl">{`Period: ${period.key}`}</Text>
    </Box>
  );
}

const MainStyles = StyleSheet.create({
  periodList: {
    marginTop: $V.smallGutter,
    marginBottom: 55,
    width: '90%',
    backgroundColor: 'green',
  },

  periodInput: {
    marginRight: $V.smallGutter,
  },
});
