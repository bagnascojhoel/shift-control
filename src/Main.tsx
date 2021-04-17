import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';
import { Common, Variables } from '@global-styles';
import { Period, Time24Hours } from '@model';
import { PeriodInput } from '@components';
import { ObjectUtils, PeriodMathUtils } from '@utils';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  const handleAddPeriod = () => {
    setPeriods([...periods, new Period()]);  
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
      <View style={MainStyles.container}>
        <Button title="Adicionar período" onPress={handleAddPeriod} />
        <Text style={Common.pageTitle}>Shift Control</Text>
        <Text>Total: {new Time24Hours(totalMinutes).toString()}</Text>

        {periods.map((period, i) => (
          <View key={`${i}period`} style={MainStyles.periodContainer}>
            <PeriodInput
              onChange={(newPeriod: Period) => handleUpdatePeriod(newPeriod, i)}
              style={MainStyles.periodInput}
              value={period}
            />
            <Button title={`Remover ${i}`} onPress={() => handleRemovePeriod(i)} />
          </View>
        ))}
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
    marginBottom: Variables.smallGutter
  },
  periodInput: {
    marginRight: Variables.smallGutter
  }
});
