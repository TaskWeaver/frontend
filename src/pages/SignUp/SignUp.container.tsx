import React, {useState, useCallback} from 'react';
import SignUpView from './SignUp.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

export default function SignUpContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleAuth = useCallback(() => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      passwordsMatch(password, confirmPassword)
    ) {
      navigation.navigate('SignUpStack', {
        screen: 'Authorization',
        params: {email: email, password: password},
      });
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
    />
  );
}
