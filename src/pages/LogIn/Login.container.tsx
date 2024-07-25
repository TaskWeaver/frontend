import React, {useState} from 'react';
import LoginView from './Login.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useBlockBackButton from '../../hooks/useBlockBackButton.ts';
import DeviceInfo from 'react-native-device-info';
import {service} from '../../domains';

export default function LoginContainer() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  const {navigation} = useCustomNavigation();
  useBlockBackButton();

  DeviceInfo.getUniqueId().then((uniqueId) => {
    setDeviceId(uniqueId);
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const result = await service.account.login(email, password, deviceId);
    if (result.resultCode === 200) {
      navigation.navigate('MainStack', {screen: 'Home'});
    }
  };

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
