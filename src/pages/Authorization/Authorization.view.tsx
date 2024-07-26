import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';
import React from 'react';

interface AuthorizationViewProps {
  authCode: string;
  onChangeAuthCode: (authCode: string) => void;
  onProfile: () => void;
  secondsLeft: number;
  formattedTime: string;
}

export default function AuthorizationView({
  authCode,
  onChangeAuthCode,
  onProfile,
  secondsLeft,
  formattedTime,
}: AuthorizationViewProps) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View className="px-6 flex-1">
        <Text className="text-2xl font-bold mt-7">회원가입</Text>
        <View className="mt-6 mt-16">
          <Text className="text-base font-semibold">인증번호</Text>
          <View className="relative">
            <Text className="text-sm text-gray absolute right-2 top-3 z-10">
              {formattedTime}
            </Text>
            <SignUpTextInput
              placeholder={'인증번호 6자리'}
              keyboardType={'numeric'}
              onChangeText={onChangeAuthCode}
              value={authCode}
            />
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
          onPress={onProfile}
          disabled={secondsLeft === 0}>
          <Text className="text-white text-center font-medium text-lg">
            본인인증
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
