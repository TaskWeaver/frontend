import {Pressable, SafeAreaView, Text, View} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';
import React from 'react';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

interface AuthorizationViewProps {
    authCode: string;
    onChangeAuthCode: (authCode: string) => void;
    onProfile: () => void;
    secondsLeft: number;
    formattedTime: string;
    onResendCode: () => void;
    isResending: boolean;
}

export default function AuthorizationView({
                                              authCode,
                                              onChangeAuthCode,
                                              onProfile,
                                              secondsLeft,
                                              formattedTime,
                                              onResendCode,
                                              isResending,
                                          }: AuthorizationViewProps) {
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
                    <IcLeftArrow size={24}/>
                </Pressable>
            </View>
            <View style={{paddingHorizontal: 24, flex: 1}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 28}}>
                    회원가입
                </Text>
                <View style={{marginTop: 48}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>인증번호</Text>
                    <View style={{position: 'relative', marginTop: 16}}>
                        {secondsLeft > 0 ? (
                            <Text
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 10,
                                    fontSize: 14,
                                    color: 'gray',
                                }}>
                                {formattedTime}
                            </Text>
                        ) : (
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    right: 2,
                                    top: 2,
                                    zIndex: 10,
                                    borderRadius: 6,
                                    backgroundColor: '#20B767',
                                    padding: 12,
                                }}
                                onPress={onResendCode}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                    }}>
                                    {'재발송'}
                                </Text>
                            </Pressable>
                        )}
                        <SignUpTextInput
                            placeholder="인증번호 6자리"
                            keyboardType="numeric"
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
                <Pressable
                    style={{
                        backgroundColor: secondsLeft > 0 ? '#20B767' : '#d9d9d9',
                        paddingVertical: 18,
                        borderRadius: 8,
                        width: '100%',
                    }}
                    onPress={onProfile}
                    disabled={secondsLeft === 0}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 16,
                        }}>
                        본인인증
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
