import React from 'react';
import HomePage from './pages/home';
import {StatusBar, Text} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#8600b3"
        translucent={true}
      />
      <HomePage />
    </>
  );
};
export default App;
