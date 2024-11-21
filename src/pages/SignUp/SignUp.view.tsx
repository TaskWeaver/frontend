import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

interface SignUpViewProps {
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  passwordsMatch: (password: string, confirmPassword: string) => boolean;
  onAuth: () => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  isLoading: boolean;
}

export default function SignUpView({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  validateEmail,
  validatePassword,
  passwordsMatch,
  onAuth,
  showPassword,
  showConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
  isLoading,
}: SignUpViewProps) {
  const {navigation} = useCustomNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 10,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 20}}>
          <IcLeftArrow size={24} />
        </Pressable>
      </View>
      <View className="px-6 flex-1">
        <Text className="text-2xl font-bold mt-7">회원가입</Text>
        <View className="mt-16">
          <Text className="text-base font-semibold">아이디</Text>
          <SignUpTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            keyboardType="email-address"
            validate={validateEmail}
            invalidText={'아이디를 입력해주세요'}
          />
        </View>
        <View className="mt-6">
          <Text className="text-base font-semibold">비밀번호</Text>

          <View className="relative">
            <SignUpTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              secureTextEntry={!showPassword}
              validate={validatePassword}
              invalidText={
                '비밀번호는 영문, 숫자, 특수문자 조합 8자리 이상이어야 합니다.'
              }
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
          <View className="relative mt-4">
            <SignUpTextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="비밀번호 재입력"
              secureTextEntry={!showConfirmPassword}
              validate={(text) => passwordsMatch(password, text)}
              invalidText={'비밀번호가 일치하지 않습니다.'}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={{position: 'absolute', right: 10, top: 15}}>
              <Image
                source={require('../../assets/images/img_visible_password.png')}
                style={{width: 20, height: 14}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 64,
          left: 0,
          right: 0,
          paddingHorizontal: 24,
        }}>
        <TouchableOpacity
          className="bg-theme py-3.5 rounded w-full"
          onPress={onAuth}>
          <Text className="text-white text-center font-medium text-lg">
            본인인증
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          }}>
          <ActivityIndicator size="large" color="#20B767" />
        </View>
      )}
    </SafeAreaView>
  );
}
