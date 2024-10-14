import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackProps} from '../types';
import TopBarNavigation from '../TopBarNavigation/TopBarNavigation.tsx';
import NotificationContainer from '../../pages/Notification/Notification.container.tsx';
import CreateTeamContainer from '../../pages/CreateTeam/CreateTeam.container.tsx';
import ManageTeamContainer from '../../pages/ManageTeam/ManageTeam.tsx';

const Stack = createNativeStackNavigator<MainStackProps>();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName={'TopBarNavigation'}>
      <Stack.Screen
        name="TopBarNavigation"
        component={TopBarNavigation}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeamContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageTeam"
        component={ManageTeamContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
