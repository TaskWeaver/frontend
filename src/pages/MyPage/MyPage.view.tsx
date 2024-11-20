import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {service} from '../../domains';
import RightChevron from '../../assets/svg/ic_rightChevron.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import Token from '../../domains/storage/Token.ts';

interface MyPageViewProps {
  email: string;
  id: string;
  imageUrl: string;
  nickname: string;
}

export default function MyPageView({
  email,
  imageUrl,
  nickname,
}: MyPageViewProps) {
  const {navigation} = useCustomNavigation();
  const token = new Token();
  // 애니메이션 값 초기화
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // 작아지는 크기
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // 원래 크기로 돌아옴
      useNativeDriver: true,
    }).start();
  };

  const handleEditUser = () => {
    navigation.navigate('MainStack', {
      screen: 'EditUserInformation',
      params: {email: email, nickname: nickname, image: imageUrl},
    });
  };

  const handleLogout = async () => {
    try {
      const accessToken = await token.getAccessToken();
      if (accessToken) {
        const response = await service.account.logout(accessToken);
        if (response.data.resultCode === 200) {
          navigation.reset({
            index: 0,
            routes: [{name: 'LogIn'}],
          });
          await token.clearToken();
        }
      } else {
        console.log('로그인된 사용자가 없습니다.');
      }
    } catch (error) {
      console.log('로그아웃 중 오류 발생:', error);
    }
  };
  const handleTermsOfService = () => {
    console.log('서비스 이용약관 버튼 클릭');
    // TODO : 여기에 서비스 이용약관 페이지로 이동하는 로직 추가
  };

  const handlePrivacyPolicy = () => {
    console.log('개인정보 처리방침 버튼 클릭');
    // TODO : 여기에 개인정보 처리방침 페이지로 이동하는 로직 추가
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 36}}>
          <View style={{paddingHorizontal: 24}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 24, marginBottom: 6}}>
                  안녕하세요
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                  {nickname}님
                </Text>
              </View>
              <Image
                source={
                  imageUrl === 'domain 주소'
                    ? require('../../assets/images/img_user_no_profile.png') // 로컬 이미지
                    : {uri: imageUrl} // 원격 URL
                }
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
              />
            </View>
            <Text style={{marginTop: 6}}>{email}</Text>
            <View
              style={{
                backgroundColor: '#20B767',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                alignSelf: 'flex-start',
                marginTop: 8,
              }}>
              <Text style={{fontWeight: 'medium', color: 'white'}}>이메일</Text>
            </View>
          </View>
          <View
            style={{backgroundColor: '#FAFAFA', height: 3, marginTop: 20}}
          />
          <View style={styles.cardContainer}>
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Pressable
                style={{
                  backgroundColor: '#FAFAFA',
                  borderRadius: 12,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  elevation: 2,
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleEditUser}>
                <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#20B767',
                    }}>
                    개인정보
                  </Text>
                  <Text
                    style={{fontSize: 16, fontWeight: 'medium', color: '#333'}}>
                    개인정보를 수정해보세요
                  </Text>
                </View>
                <RightChevron size={24} />
              </Pressable>
            </Animated.View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
          <View>
            <Pressable onPress={handleLogout}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#20B767'}}>
                로그아웃
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 20,
          }}>
          <Pressable
            onPress={handleTermsOfService}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={{fontSize: 14, color: '#333', fontWeight: 'medium'}}>
              서비스 이용약관
            </Text>
          </Pressable>
          <Text style={styles.separator}>|</Text>
          <Pressable
            onPress={handlePrivacyPolicy}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={{fontSize: 14, color: '#333', fontWeight: 'medium'}}>
              개인정보 처리방침
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  cardContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#20B767',
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 4,
  },
};
