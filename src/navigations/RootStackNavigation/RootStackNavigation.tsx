import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import OnBoarding from '../../pages/OnBoarding';
import SignUpNavigation from '../SignUpNavigation';
import LogIn from '../../pages/LogIn/Login.container.tsx';
import MainNavigation from '../MainNavigation';
import Token from '../../domains/storage/Token.ts';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
  const [initialRoute, setInitialRoute] = useState<
    'MainStack' | 'OnBoarding' | 'LogIn' | ''
  >('');
  const tokenManager = new Token();

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        const hasSeenOnBoarding = await tokenManager.getOnBoarding();
        const isAccessTokenExpired = await tokenManager.isTokenExpired(
          'accessTokenExpireTime'
        );

        if (!isAccessTokenExpired) {
          setInitialRoute('MainStack');
        } else {
          const refreshedAccessToken = await tokenManager.refreshTokens();
          if (refreshedAccessToken) {
            setInitialRoute('MainStack');
          } else if (hasSeenOnBoarding === 'true') {
            setInitialRoute('LogIn');
          } else {
            setInitialRoute('OnBoarding');
          }
        }
      } catch (error) {
        console.log('초기 경로 설정 중 오류 발생:', error);
        setInitialRoute('OnBoarding'); // 기본값
      }
    };

    checkInitialRoute();
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#20B767" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
