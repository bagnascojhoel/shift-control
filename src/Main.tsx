import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Box, Text, Center, useToast, Button } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import _ from 'lodash';

import { $V } from '@global-styles';
import { Period } from '@model';
import { TotalTimeCard, AddPeriodButton, PeriodInput } from '@components';
import { PeriodMathUtils, ArrayUtils } from '@utils';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  const handleAddPeriod = () => {
    const lastPeriod = periods[periods.length - 1];
    const nextPeriod = lastPeriod ? Period.buildNextFrom(lastPeriod) : new Period();

    setPeriods([...periods, nextPeriod]);
  };

  const handleSwipeValueChange = ({ key, value }) => {
    if (value < -Dimensions.get('window').width) {
      const remainingPeriods = periods.filter((period) => period.key !== key);
      setPeriods(remainingPeriods);
    }
  };

  const handlePeriodChange = (newPeriod: Period, key: number) => {
    const changedPeriodIndex = periods.findIndex(({ key: currKey }) => currKey === key);

    const newPeriods = ArrayUtils.replace(periods, changedPeriodIndex, newPeriod);
    setPeriods(newPeriods);
  };

  useEffect(() => {
    const total = periods.reduce(
      (totalMinutes, period) => totalMinutes + PeriodMathUtils.calcDuration(period),
      0,
    );
    setTotalMinutes(total);
  }, [periods]);

  const renderPeriodInput = ({ item }: { item: Period }) => {
    return (
      <PeriodInput
        key={item.key}
        value={item}
        onChange={(period) => handlePeriodChange(period, item.key)}
      />
    );
  };

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

const MainStyles = StyleSheet.create({
  periodList: {
    marginTop: $V.smallGutter,
    marginBottom: 55,
    width: '100%',
    paddingHorizontal: $V.largeGutter,
  },

  periodInput: {
    marginRight: $V.smallGutter,
  },
});
