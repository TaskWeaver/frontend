import React, {useState, useEffect} from 'react';
import LoginView from './Login.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useBlockBackButton from '../../hooks/useBlockBackButton.ts';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가
import {service} from '../../domains';

export default function LoginContainer() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {navigation} = useCustomNavigation();
  useBlockBackButton();

  // 디바이스 ID 가져오기
  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setDeviceId(uniqueId);
    });
  }, []);

  // 토큰 저장 함수
  const storeTokens = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.log('토큰 저장 오류:', error);
    }
  };

  // 토큰 가져오기 함수
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      return token;
    } catch (error) {
      console.log('토큰 가져오기 오류:', error);
      return null;
    }
  };

  // 토큰 만료 여부 확인 함수
  const isTokenExpired = (token: string) => {
    // accessToken의 만료 여부를 확인하는 로직을 구현 (JWT의 경우 payload에서 exp 확인 가능)
    const payload = JSON.parse(atob(token.split('.')[1])); // 토큰의 payload 추출
    const expiryTime = payload.exp * 1000;
    return Date.now() >= expiryTime; // 현재 시간이 만료 시간을 넘었는지 확인
  };

  // 로그인 처리
  const handleLogin = async () => {
    const {result, resultCode} = await service.account.login(
      email,
      password,
      deviceId
    );
    if (resultCode === 200) {
      const {accessToken, refreshToken} = result;
      await storeTokens(accessToken, refreshToken);
      navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      navigation.navigate('LogIn');
    } catch (error) {
      console.log('로그아웃 오류:', error);
    }
  };

  // 로그인 상태 유지
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getAccessToken();
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
        navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
      } else {
        handleLogout();
      }
    };

    checkAuthStatus();
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpStack', {screen: 'SignUp'});
  };

  return (
    <LoginView
      password={password}
      email={email}
      setPassword={setPassword}
      setEmail={setEmail}
      toggleShowPassword={toggleShowPassword}
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      showPassword={showPassword}
    />
  );
}
