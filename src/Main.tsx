import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';
import { Common } from '@global-styles';
import { Period, Time } from '@model';
import { PeriodInput } from '@components';

export default function Main() {
  const [periodList, setPeriodList] = useState<Period[]>([new Period()]);

  const handleAddPeriod = () => {
    setPeriodList([...periodList, new Period()]);
  };

  const handleUpdatePeriod = (aPeriod: Period, i: number) => {
    const newPeriodList: Period[] = [...periodList];
    newPeriodList[i] = aPeriod;
    setPeriodList(newPeriodList);
  };
  // TODO discober why it's only changing one of the times value
  
  return (
    <>
      <StatusBar />
      <View style={MainStyles.container}>
        <Button title="Adicionar período" onPress={handleAddPeriod} />
        <Text style={Common.pageTitle}>Shift Control</Text>

        {periodList.map((period, i) => (
          <PeriodInput
            onChange={(newPeriod: Period) => handleUpdatePeriod(newPeriod, i)}
            value={period}
            key={i}
          />
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
