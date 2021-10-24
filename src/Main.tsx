import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native';

import { Common, $V, $C } from '@global-styles';
import { Period } from '@model';
import { PeriodInput, TotalTimeCard, AddPeriodButton } from '@components';
import { ObjectUtils, PeriodMathUtils } from '@utils';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  const handleAddPeriod = () => {
    const previousPeriod = periods[periods.length -1];
    const nextPeriod = previousPeriod ? new Period(previousPeriod.end) : new Period();
    setPeriods([...periods, nextPeriod]);  
  };

  const handleUpdatePeriod = (aPeriod: Period, i: number) => {
    const newPeriodList: Period[] = [...periods];
    newPeriodList[i] = ObjectUtils.cloneDeep(aPeriod);
    setPeriods(newPeriodList);
  };
  
  const handleRemovePeriod = (index: number) => {
    const newPeriods = [...periods];
    newPeriods.splice(index, 1);
    setPeriods(newPeriods);
  } 
  
  useEffect(() => {
    const total = periods.reduce(
        (totalMinutes, period) => totalMinutes + PeriodMathUtils.calcDuration(period)
        , 0
      );
    setTotalMinutes(total);
  }, [periods])
  
  return (
    <>
      <StatusBar/>
      <View style={{...MainStyles.container, ...Common.global}}>
        <TotalTimeCard totalMinutes={totalMinutes}/>

        <ScrollView style={MainStyles.periodList}>
          {periods.map((period, i) => (
              <PeriodInput
                onChange={(newPeriod: Period) => handleUpdatePeriod(newPeriod, i)}
                onRemove={() => handleRemovePeriod(i)}
                style={MainStyles.periodInput}
                value={period}
                key={`${i}period`}
              />
          ))}
        </ScrollView>
        <AddPeriodButton onPress={handleAddPeriod}/>
      </View>
    </>
  );
}

const MainStyles = StyleSheet.create({
  container: {
    ...Common.container,
    alignItems: 'center',
  },

  periodList: {
    marginTop: $V.smallGutter,
    marginBottom: 55,
    width: '100%',
  },

  periodInput: {
    marginRight: $V.smallGutter
  }
});
