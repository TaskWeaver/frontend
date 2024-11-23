import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../../pages/SignUp';
import {SignUpParamList} from '../types';
import Authorization from '../../pages/Authorization';
import Profile from '../../pages/Profile';
import Terms from '../../pages/Terms';

const Stack = createNativeStackNavigator<SignUpParamList>();

export default function SignUpNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Authorization"
        component={Authorization}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
