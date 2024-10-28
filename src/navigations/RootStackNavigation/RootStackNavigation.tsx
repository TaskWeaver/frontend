import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import OnBoarding from '../../pages/OnBoarding';
import SignUpNavigation from '../SignUpNavigation';
import LogIn from '../../pages/LogIn/Login.container.tsx';
import MainNavigation from '../MainNavigation';
import Token from '../../domains/storage/Token.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
  const [initialRoute, setInitialRoute] = useState<'OnBoarding' | 'MainStack'>(
    'OnBoarding'
  );
  const tokenManager = new Token();

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = await tokenManager.getAccessToken();
      if (token) {
        setInitialRoute('MainStack');
      }
    };

    checkAccessToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'LogIn'}
          component={LogIn}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignUpStack"
          component={SignUpNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainStack"
          component={MainNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
