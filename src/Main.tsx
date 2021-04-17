import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';

import { Common, $V } from '@global-styles';
import { Period, Time24Hours } from '@model';
import { PeriodInput, TotalTimeCard } from '@components';
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
      <StatusBar />
      <View style={{...MainStyles.container, ...Common.global}}>
        <TotalTimeCard totalMinutes={totalMinutes}/>

        {periods.map((period, i) => (
          <View key={`${i}period`} style={MainStyles.periodContainer}>
            <PeriodInput
              onChange={(newPeriod: Period) => handleUpdatePeriod(newPeriod, i)}
              onRemove={() => handleRemovePeriod(i)}
              style={MainStyles.periodInput}
              value={period}
            />
          </View>
        ))}


        <Button title="Adicionar período" onPress={handleAddPeriod} />
      </View>
    </>
  );
}

const MainStyles = StyleSheet.create({
  container: {
    ...Common.container,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  periodContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: $V.smallGutter
  },

  periodInput: {
    marginRight: $V.smallGutter
  }
});
