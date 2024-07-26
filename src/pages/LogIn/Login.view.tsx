import React from 'react';
import {Text, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';

interface LoginViewProps {
  password: string;
  email: string;
  setPassword: (text: string) => void;
  setEmail: (text: string) => void;
  toggleShowPassword: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  showPassword: boolean;
}

export default function LoginView({
  password,
  email,
  setPassword,
  setEmail,
  toggleShowPassword,
  onLogin,
  onForgotPassword,
  onSignUp,
  showPassword,
}: LoginViewProps) {
  return (
    <SafeAreaView className="flex">
      <View className="items-center">
        <Image
          className="w-24 h-12 my-28"
          source={require('../../assets/images/img_logo.png')}
          resizeMode="contain"
        />
      </View>
      <View className="flex-col px-6">
        <View className="mt-6">
          <SignUpTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="아이디(이메일)"
          />
          <View className="relative">
            <SignUpTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={{position: 'absolute', right: 10, top: 15}}>
              <Image
                source={require('../../assets/images/img_visible_password.png')}
                style={{width: 20, height: 14}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className="mt-28 bg-theme rounded p-5"
          onPress={onLogin}>
          <Text className="text-center text-white font-bold">로그인</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text className="text-gray">|</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSignUp}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
