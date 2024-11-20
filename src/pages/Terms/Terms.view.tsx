import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

interface TermsViewProps {
  onSignUp: () => void;
  isTermsAgreed: boolean;
  toggleTermsAgreed: () => void;
}

export default function TermsView(props: TermsViewProps) {
  const {onSignUp, isTermsAgreed, toggleTermsAgreed} = props;
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
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 28}}>
          회원가입
        </Text>
        <View style={{marginTop: 24}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 28,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {'필수 약관 전체 동의'}
            </Text>
            <Pressable
              onPress={toggleTermsAgreed}
              style={{
                width: 24,
                height: 24,
                borderWidth: 2,
                borderColor: isTermsAgreed ? '#20B767' : '#d9d9d9',
                backgroundColor: isTermsAgreed ? '#20B767' : 'white',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isTermsAgreed && (
                <Text style={{color: 'white', fontWeight: 'bold'}}>✓</Text>
              )}
            </Pressable>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 28,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>
              {'(필수) Task Weaver 서비스 이용 약관'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 28,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>
              {'(필수) Task Weaver 개인정보 수집/이용 동의'}
            </Text>
          </TouchableOpacity>
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
          style={{
            backgroundColor: isTermsAgreed ? '#20B767' : '#d9d9d9',
            paddingVertical: 16,
            borderRadius: 8,
            width: '100%',
          }}
          onPress={isTermsAgreed ? onSignUp : undefined}
          disabled={!isTermsAgreed}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
            }}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
