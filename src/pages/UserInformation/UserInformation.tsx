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
import {useNavigation} from '@react-navigation/native';

export default function UserInformation() {
  const navigation = useNavigation();

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
      <View style={styles.mainContent}>
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
                    {/*{nickname}님*/}
                  </Text>
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
              {/*<Text style={{marginTop: 6}}>{email}</Text>*/}
              <View
                style={{
                  backgroundColor: '#20B767',
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 20,
                  alignSelf: 'flex-start',
                  marginTop: 8,
                }}>
                <Text style={{fontWeight: 'medium', color: 'white'}}>
                  이메일
                </Text>
              </View>
            </View>
            <View
              style={{backgroundColor: '#FAFAFA', height: 3, marginTop: 20}}
            />
          </View>
        </View>
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
    paddingBottom: 10,
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
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
