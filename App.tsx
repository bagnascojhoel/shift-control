import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import DarkTheme from './dark-theme';

import Main from './src/Main';

export default function App() {
  return (
    <NativeBaseProvider theme={DarkTheme}>
      <>
        <StatusBar />
        <Main />
      </>
    </NativeBaseProvider>
  );
}
