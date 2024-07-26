import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

interface TermsViewProps {
  onSignUp: () => void;
}

export default function TermsView(props: TermsViewProps) {
  const {onSignUp} = props;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
            <TouchableOpacity></TouchableOpacity>
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
            backgroundColor: '#0a84ff',
            paddingVertical: 14,
            borderRadius: 6,
            width: '100%',
          }}
          onPress={onSignUp}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 18,
            }}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
