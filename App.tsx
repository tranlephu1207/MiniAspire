/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';

import MainSwitchNavigator from './src/routers/MainSwitchNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <MainSwitchNavigator />
    </Provider>
  );
};

export default App;
