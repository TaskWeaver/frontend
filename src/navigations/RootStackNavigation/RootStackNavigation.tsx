import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {OnBoarding, SignIn} from '../../pages';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'OnBoarding'}>
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={'LogIn'}
                    component={SignIn}
                    options={{headerShown: false, gestureEnabled: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
