import React, {useState, useEffect, useCallback, useMemo} from 'react';
import LoginView from './Login.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useBlockBackButton from '../../hooks/useBlockBackButton.ts';
import DeviceInfo from 'react-native-device-info';
import AsyncStorageService from '../../storage/AsyncStorage.ts';
import {service} from '../../domains';

export default function LoginContainer() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {navigation} = useCustomNavigation();
  useBlockBackButton();

  const asyncStorageService = useMemo(() => new AsyncStorageService(), []);

  // 디바이스 ID 가져오기
  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setDeviceId(uniqueId);
    });
  }, []);

  // 로그인 처리
  const handleLogin = async () => {
    const {result, resultCode} = await service.account.login(
      email,
      password,
      deviceId
    );
    if (resultCode === 200) {
      const {accessToken, refreshToken} = result;
      await asyncStorageService.setAccessToken(accessToken);
      await asyncStorageService.setRefreshToken(refreshToken);
      navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
    }
  };

  // 로그아웃 처리
  const handleLogout = useCallback(async () => {
    try {
      await asyncStorageService.removeToken();
      setIsAuthenticated(false);
      navigation.navigate('LogIn');
    } catch (error) {
      console.log('로그아웃 오류:', error);
    }
  }, [asyncStorageService, navigation]);

  // 로그인 상태 유지
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = await asyncStorageService.getAccessToken();
      const refreshToken = await asyncStorageService.getRefreshToken();
      if (accessToken && refreshToken && !isTokenExpired(accessToken)) {
        setIsAuthenticated(true);
        navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
      } else {
        handleLogout();
      }
    };

    checkAuthStatus();
  }, [asyncStorageService, handleLogout, navigation]);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpStack', {screen: 'SignUp'});
  };

  // 토큰 만료 여부 확인 함수
  const isTokenExpired = (token: string) => {
    // accessToken의 만료 여부를 확인하는 로직을 구현 (JWT의 경우 payload에서 exp 확인 가능)
    const payload = JSON.parse(atob(token.split('.')[1])); // 토큰의 payload 추출
    const expiryTime = payload.exp * 1000;
    return Date.now() >= expiryTime; // 현재 시간이 만료 시간을 넘었는지 확인
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
