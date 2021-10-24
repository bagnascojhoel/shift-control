import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Main from './src/Main';

export default function App() {
  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
}
