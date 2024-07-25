import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackProps} from '../types';
import Home from '../../pages/Home';

const Stack = createNativeStackNavigator<MainStackProps>();

export default function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
