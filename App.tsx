import React from 'react';
import {RootStackNavigator} from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/app/store.ts';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}

export default App;
