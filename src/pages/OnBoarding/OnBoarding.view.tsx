import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';

interface OnBoardingViewProps {
  onLogIn: () => void;
}

export default function OnBoardingView(props: OnBoardingViewProps) {
  const {onLogIn} = props;

  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={{flexGrow: 1}}>
        <View
          style={{
            marginTop: 32,
            paddingHorizontal: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              aspectRatio: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/img_onboarding.png')}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <Text className="text-xl font-bold">
            핸드폰으로 하는 프로젝트 관리
          </Text>
          <Text className="text-sm text-gray-dark text-center my-6">
            {
              '학교에서, 길거리에서, 카페에서 언제든\nTask Weaver에서 프로젝트를 관리해요'
            }
          </Text>
        </View>
        <View className="px-6" style={{gap: 10}}>
          <TouchableOpacity
            className="bg-theme py-3.5 rounded"
            onPress={onLogIn}>
            <Text className="text-white text-center font-medium text-base">
              Task Weaver 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
