import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet,
  Text,
} from 'react-native';

import { $C, $V } from '@global-styles';

import { Icons } from '../icons/icons';

export function AddPeriodButton({
  onPress,
}: {
  onPress: () => any
}) {

  return <TouchableOpacity onPress={onPress} style={AddPeriodButtonStyles.container}>
    <Icons.AddClock large style={AddPeriodButtonStyles.icon} />
    <Text style={AddPeriodButtonStyles.text}>Adicionar turno</Text>
  </TouchableOpacity>
} 

const AddPeriodButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: $V.smallGutter,
    right: $V.smallGutter,
  
    padding: $V.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $C.white,
    borderColor: $C.mediumPurple,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  icon: {
    marginRight: $V.smallGutter,
  },

  text: {
    fontSize: $V.fontSizeLarge,
    fontWeight: 'bold',
    color: $C.mediumPurple
  }
});