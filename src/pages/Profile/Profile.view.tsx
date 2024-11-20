import React from 'react';
import {
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

interface ProfileViewProps {
  nickname: string;
  onNicknameChange: (userName: string) => void;
  imageUrl: string | null;
  onImagePress: () => void;
  onNextPress: () => void;
}

export default function ProfileView({
  nickname,
  onNicknameChange,
  imageUrl,
  onImagePress,
  onNextPress,
}: ProfileViewProps) {
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
        <View className="mt-6">
          <TouchableOpacity
            className="items-center mt-16"
            activeOpacity={0}
            onPress={onImagePress}>
            <Image
              source={
                imageUrl
                  ? {uri: imageUrl}
                  : require('../../assets/images/img_profile_image.png')
              }
              style={{width: 70, height: 70, borderRadius: imageUrl ? 35 : 0}}
            />
          </TouchableOpacity>
          <View>
            <Text className="text-base font-semibold mt-6">닉네임</Text>
            <SignUpTextInput
              placeholder={'한글, 영문, 숫자 조합'}
              keyboardType={'default'}
              onChangeText={onNicknameChange}
              value={nickname}
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
          onPress={onNextPress}>
          <Text className="text-white text-center font-medium text-lg">
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
