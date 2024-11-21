import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import RightChevron from '../../assets/svg/ic_rightChevron.tsx';

type UserInformationProps = RouteProp<
  {UserInformation: {nickname: string; email: string}},
  'UserInformation'
>;

export default function UserInformation() {
  const navigation = useNavigation();
  const route = useRoute<UserInformationProps>();
  const {email, nickname} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <IcLeftArrow size={24} />
        </Pressable>
        <Text style={styles.title}>개인정보 수정</Text>
      </View>
      <View style={styles.divider} />
      <View style={{paddingHorizontal: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 6}}>
              안녕하세요
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>{nickname}님</Text>
          </View>
          <Image
            source={require('../../assets/images/img_profile_image.png')}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
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
      <View style={{backgroundColor: '#FAFAFA', height: 3, marginTop: 20}} />
      <View style={{flex: 1, paddingHorizontal: 24, marginTop: 12}}>
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
          }}>
          <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#20B767',
              }}>
              개인정보
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'medium', color: '#333'}}>
              개인정보를 수정해보세요
            </Text>
          </View>
          <RightChevron size={24} />
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>탈퇴하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 4,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  divider: {
    height: 3,
    backgroundColor: '#FAFAFA',
    marginBottom: 46,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
