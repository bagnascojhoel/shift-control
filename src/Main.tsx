import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';
import { Common } from '@global-styles';
import { Period, Time } from '@model';
import { PeriodInput } from '@components';

export default function Main() {
  const [periods, setPeriods] = useState<Period[]>([new Period()]);
  
  const handleAddPeriod = () => {
    setPeriods([...periods, new Period()]);  
  };

  const handleUpdatePeriod = (aPeriod: Period, i: number) => {
    const newPeriodList: Period[] = [...periods];
    newPeriodList[i] = aPeriod;
    setPeriods(newPeriodList);
  };
  // TODO adicionar total de tempo nos períodos
  return (
    <>
      <StatusBar />
      <View style={MainStyles.container}>
        <Button title="Adicionar período" onPress={handleAddPeriod} />
        <Text style={Common.pageTitle}>Shift Control</Text>
        <Text>Total: {
        periods.reduce(
          (total, period): Time => {
            return total.add(period.duration)
          },
          Time.getEmpty()
        ).toString()
        }</Text>

        {periods.map((period, i) => (
          <View key={`${i}period`}>
            <PeriodInput
              onChange={(newPeriod: Period) => handleUpdatePeriod(newPeriod, i)}
              value={period}
            />
            <Text>SPACE {i}</Text>
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
});
