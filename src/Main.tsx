import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';
import { Common, Variables } from '@global-styles';
import { Period, Time } from '@model';
import { PeriodInput } from '@components';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  const [total, setTotal] = useState<Time>(new Time());

  const handleAddPeriod = () => {
    setPeriods([...periods, new Period()]);  
  };

  const handleUpdatePeriod = (aPeriod: Period, i: number) => {
    console.log('update period')
    const newPeriodList: Period[] = [...periods];
    newPeriodList[i] = aPeriod;
    setPeriods(newPeriodList);
  };

  const handleRemovePeriod = (index: number) => {
    const newPeriods = [...periods];
    newPeriods.splice(index, 1);
    console.log(newPeriods);
    setPeriods(newPeriods);
  } 

  useEffect(() => {
    console.log(periods);
    setTotal(periods.reduce((total, period) => total.add(period.duration), Time.getEmpty()));
  }, [periods])
  
  return (
    <>
      <StatusBar />
      <View style={MainStyles.container}>
        <Button title="Adicionar período" onPress={handleAddPeriod} />
        <Text style={Common.pageTitle}>Shift Control</Text>
        <Text>Total: {total.toString()}</Text>

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
