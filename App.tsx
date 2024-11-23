import React from 'react';
import {RootStackNavigation} from './src/navigations';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootStackNavigation />
      </GestureHandlerRootView>
  );
}

export default App;
