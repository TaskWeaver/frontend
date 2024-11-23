import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
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
      <View style={{ paddingHorizontal: 24, flex: 1}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 28 }}>회원가입</Text>
        <View style={{ marginTop: 24}}>
          <Pressable
              style={{ alignItems: 'center', marginTop: 64 }}
              onPress={onImagePress}>
            <Image
              source={
                imageUrl
                  ? {uri: imageUrl}
                  : require('../../assets/images/img_profile_image.png')
              }
              style={{width: 70, height: 70, borderRadius: imageUrl ? 35 : 0}}
            />
          </Pressable>
          <View>
            <Text style={{fontWeight: 'semibold', marginTop: 24 }}>닉네임</Text>
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
        <Pressable
            style={{ backgroundColor: '#20B767', paddingVertical: 14, borderRadius: 12, width: '100%' }}
          onPress={onNextPress}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'medium', fontSize: 20}}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
