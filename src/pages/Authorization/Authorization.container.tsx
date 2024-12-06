import AuthorizationView from './Authorization.view';
import {useEffect, useState} from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useTimer from '../../hooks/useTimer.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SignUpParamList} from '../../navigations/types.ts';
import {service} from '../../domains';
import {Keyboard} from 'react-native';

type AuthorizationRouteProps = RouteProp<SignUpParamList, 'Authorization'>;

export default function AuthorizationContainer() {
    const [code, setCode] = useState('');
    const [isResending, setIsResending] = useState(false);

    const {navigation} = useCustomNavigation();
    const route = useRoute<AuthorizationRouteProps>();
    const {email, password, authCode} = route.params;

    const {secondsLeft, formatTime, resetTimer} = useTimer();

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleAuthCodeChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setCode(numericValue);
    };

    const handleProfile = () => {
        if (code === authCode) {
            navigation.navigate('SignUpStack', {
                screen: 'Profile',
                params: {email, password},
            });
        }
    };

    const handleResendCode = async () => {
        resetTimer();
        try {
            await service.account.sendAuthCode(email);
        } catch (e) {
            throw e;
        }
    };

    return (
        <AuthorizationView
            authCode={code}
            onChangeAuthCode={handleAuthCodeChange}
            onProfile={handleProfile}
            secondsLeft={secondsLeft}
            formattedTime={formatTime()}
            onResendCode={handleResendCode}
            isResending={isResending}
        />
    );
}
