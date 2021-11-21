import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Box, Flex, Heading, Fab, Icon } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import _ from 'lodash';

import { $V } from '@global-styles';
import { Period } from '@model';
import { PeriodInput } from '@components';
import { PeriodMathUtils, ArrayUtils } from '@utils';

const EMPTY_TOTAL_TIME_TEXT: string = 'no time';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalTimeText, setTotalTimeText] = useState<string>(EMPTY_TOTAL_TIME_TEXT);

  function handleAddPeriod() {
    const lastPeriod = periods[periods.length - 1];
    const nextPeriod = lastPeriod ? Period.buildNextFrom(lastPeriod) : new Period();

    setPeriods([...periods, nextPeriod]);
  }

  function handleSwipeValueChange({ key, value }) {
    if (value < -Dimensions.get('window').width) {
      const remainingPeriods = periods.filter((period) => period.key !== key);

      setPeriods(remainingPeriods);
    }
  }

  function handlePeriodChange(newPeriod: Period, key: number) {
    const changedPeriodIndex = periods.findIndex(({ key: currKey }) => currKey === key);
    const newPeriods = ArrayUtils.replaceItem(periods, changedPeriodIndex, newPeriod);

    setPeriods(newPeriods);
  }

  useEffect(() => {
    const hours = Math.floor(totalMinutes / 60);
    const hoursLabel = hours >= 2 ? 'hours' : 'hour';
    const minutes = totalMinutes % 60;
    const minutesLabel = minutes >= 2 ? 'minutes' : 'minute';

    if (!hours && !minutes) setTotalTimeText(EMPTY_TOTAL_TIME_TEXT);
    else if (!hours) setTotalTimeText(`${minutes} ${minutesLabel}`);
    else if (!minutes) setTotalTimeText(`${hours} ${hoursLabel}`);
    else setTotalTimeText(`${hours} ${hoursLabel} and ${minutes} ${minutesLabel}`);
  }, [totalMinutes]);

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
    <Flex size="full">
      <Box width="full" bg="gray.500" padding="8">
        <Heading size="xl" color="white" fontWeight="normal">
          Today, you have worked for{' '}
          <Heading size="xl" color="white" fontWeight="bold">
            {totalTimeText}
          </Heading>
        </Heading>
      </Box>
      <Box size="full" bgColor="black">
        <SwipeListView
          disableRightSwipe
          data={periods}
          onSwipeValueChange={handleSwipeValueChange}
          renderItem={renderPeriodInput}
          rightOpenValue={-Dimensions.get('window').width}
          renderHiddenItem={(data) => <></>}
        />
      </Box>
      <Fab
        onPress={handleAddPeriod}
        colorScheme="gray"
        icon={<Icon as={<MaterialIcons name="add" />} size="lg" color="black" />}
      />
    </Flex>
  );
}
