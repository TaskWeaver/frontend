import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import OnBoarding from '../../pages/OnBoarding';
import SignUpNavigation from '../SignUpNavigation';
import LogIn from '../../pages/LogIn/Login.container.tsx';
import MainNavigation from '../MainNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
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
