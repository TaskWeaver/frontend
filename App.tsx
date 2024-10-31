import React from 'react';
import {RootStackNavigator} from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/app/store.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
