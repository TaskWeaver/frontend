import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import ProfileView from './Profile.view';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SignUpParamList} from '../../navigations/types.ts';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

type ProfileRouteProps = RouteProp<SignUpParamList, 'Profile'>;

export default function ProfileContainer() {
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const {navigation} = useCustomNavigation();
  const route = useRoute<ProfileRouteProps>();

  const {email, password} = route.params;

  const checkAndRequestPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }

    if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
      Alert.alert(
        '권한 필요',
        '앨범 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {text: '설정으로 이동', onPress: () => openSettings()},
        ]
      );
    }

    return false;
  };

  const handleImagePick = async () => {
    const hasPermission = await checkAndRequestPermission();
    if (!hasPermission) {
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0].uri) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleNextPress = async () => {
    navigation.navigate('SignUpStack', {
      screen: 'Terms',
      params: {
        email,
        password,
        nickname,
        imageUrl,
      },
    });
  };

  return (
    <ProfileView
      nickname={nickname}
      onNicknameChange={setNickname}
      imageUrl={imageUrl}
      onImagePress={handleImagePick}
      onNextPress={handleNextPress}
    />
  );
}
