import React, {useEffect, useState} from 'react';
import OnBoardingView from './OnBoarding.view.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Token from '../../domains/storage/Token.ts';

export default function OnBoardingContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const {navigation} = useCustomNavigation();
  const TokenManager = new Token();

  useEffect(() => {
    const checkOnBoarding = async () => {
      try {
        const hasSeen = await TokenManager.getOnBoarding();
        if (hasSeen === 'true') {
          navigation.navigate('LogIn');
        }
      } catch (error) {
        console.log('OnBoarding 확인 중 오류 발생:', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    checkOnBoarding();
  }, [navigation]);

  const handleLogIn = async () => {
    try {
      await TokenManager.saveOnBoarding();
      navigation.navigate('LogIn');
    } catch (error) {
      console.log('OnBoarding 저장 중 오류 발생:', error);
    }
  };

  if (isLoading) {
    // 초기 로딩 화면
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#20B767" />
      </View>
    );
  }

  return <OnBoardingView onLogIn={handleLogIn} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
