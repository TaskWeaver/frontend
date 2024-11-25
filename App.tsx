import React, {useEffect} from 'react';
import {RootStackNavigator} from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/app/store.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    });

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                <PaperProvider>
                    <RootStackNavigator/>
                </PaperProvider>
            </Provider>
            <Toast/>
        </GestureHandlerRootView>
    );
}

export default App;
