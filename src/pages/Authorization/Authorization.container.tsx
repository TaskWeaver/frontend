import AuthorizationView from './Authorization.view';
import {useState} from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useTimer from '../../hooks/useTimer.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SignUpParamList} from '../../navigations/types.ts';

type AuthorizationRouteProps = RouteProp<SignUpParamList, 'Authorization'>;

export default function AuthorizationContainer() {
  const [authCode, setAuthCode] = useState('');

  const {navigation} = useCustomNavigation();
  const route = useRoute<AuthorizationRouteProps>();
  const {secondsLeft, formatTime} = useTimer();

  const {email, password} = route.params;

  const handleAuthCodeChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAuthCode(numericValue);
  };

  const handleProfile = () => {
    if (authCode === '123456') {
      navigation.navigate('SignUpStack', {
        screen: 'Profile',
        params: {email: email, password: password},
      });
    }
  };

  return (
    <AuthorizationView
      authCode={authCode}
      onChangeAuthCode={handleAuthCodeChange}
      onProfile={handleProfile}
      secondsLeft={secondsLeft}
      formattedTime={formatTime()}
    />
  );
}
