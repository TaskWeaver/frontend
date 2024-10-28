import React, {useState, useEffect} from 'react';
import LoginView from './Login.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useBlockBackButton from '../../hooks/useBlockBackButton.ts';
import DeviceInfo from 'react-native-device-info';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

export default function LoginContainer() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const tokenManager = new Token();

  const {navigation} = useCustomNavigation();
  useBlockBackButton();

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
      await tokenManager.saveToken(accessToken, refreshToken);
      setEmail('');
      setPassword('');
      navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
    }
  };

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
