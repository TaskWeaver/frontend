import {Pressable, SafeAreaView, Text, View} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';
import React, {useState} from 'react';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import useTimer from '../../hooks/useTimer.ts';
import {service} from '../../domains';
import {MainStackProps} from '../../navigations/types.ts';

type AuthorizationRouteProps = RouteProp<MainStackProps, 'FindPasswordAuth'>;

export default function FindPasswordAuth() {

    const [code, setCode] = useState('');

    const {navigation} = useCustomNavigation();
    const route = useRoute<AuthorizationRouteProps>();
    const {email, authCode} = route.params;

    const {secondsLeft, formatTime, resetTimer} = useTimer();

    const handleAuthCodeChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setCode(numericValue);
    };

    const handleSetPassword = () => {
        if (code === authCode) {
            navigation.navigate('MainStack', {
                screen: 'SetPassword',
            });
        }
    };

    const handleResendCode = async () => {
        resetTimer(); // 타이머 초기화
        try {
            await service.account.sendAuthCode(email);
        } catch (e) {
            throw e;
        }
    };

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
                                {formatTime()}
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
                                onPress={handleResendCode}>
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
                            onChangeText={handleAuthCodeChange}
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
                        paddingVertical: 16,
                        borderRadius: 8,
                        width: '100%',
                    }}
                    disabled={secondsLeft === 0}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 16,
                        }}>
                        인증하기
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
