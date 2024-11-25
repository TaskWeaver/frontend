import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackProps} from '../types';
import TopBarNavigation from '../TopBarNavigation/TopBarNavigation.tsx';
import NotificationContainer from '../../pages/Notification/Notification.container.tsx';
import CreateTeamContainer from '../../pages/CreateTeam/CreateTeam.container.tsx';
import ManageTeamContainer from '../../pages/ManageTeam/ManageTeam.tsx';
import UserInformation from '../../pages/UserInformation/UserInformation.tsx';
import EditTeamPage from '../../pages/EditTeam/EditTeam.tsx';
import TeamMember from '../../pages/TeamMember/TeamMember.tsx';
import CreateProject from '../../pages/CreateProject/CreateProject.tsx';
import FindPassword from '../../pages/FindPassword/FindPassword.tsx';

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
            <Stack.Screen
                name={'EditTeam'}
                component={EditTeamPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'EditUserInformation'}
                component={UserInformation}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'TeamMember'}
                component={TeamMember}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'CreateProject'}
                component={CreateProject}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'FindPassword'}
                component={FindPassword}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
