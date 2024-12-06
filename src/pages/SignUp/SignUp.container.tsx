import React, {useState, useCallback} from 'react';
import SignUpView from './SignUp.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {service} from '../../domains';

export default function SignUpContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {navigation} = useCustomNavigation();

    const validateEmail = useCallback((email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }, []);

    const validatePassword = useCallback((password: string) => {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    }, []);

    const passwordsMatch = useCallback(
        (password: string, confirmPassword: string) => {
            return password === confirmPassword;
        },
        []
    );

    const handleAuth = useCallback(async () => {
        if (
            validateEmail(email) &&
            validatePassword(password) &&
            passwordsMatch(password, confirmPassword)
        ) {
            setIsLoading(true);
            try {
                const response = await service.account.sendAuthCode(email);
                navigation.navigate('SignUpStack', {
                    screen: 'Authorization',
                    params: {
                        email: email,
                        password: password,
                        authCode: response.result.certificationNum,
                    },
                });
            } catch (error) {
                console.error('Error sending auth code:', error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        }
    }, [
        validateEmail,
        email,
        validatePassword,
        password,
        passwordsMatch,
        confirmPassword,
        navigation,
    ]);

    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const toggleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    return (
        <SignUpView
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            passwordsMatch={passwordsMatch}
            onAuth={handleAuth}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            toggleShowPassword={toggleShowPassword}
            toggleShowConfirmPassword={toggleShowConfirmPassword}
            isLoading={isLoading} // 로딩 상태 전달
        />
    );
}
