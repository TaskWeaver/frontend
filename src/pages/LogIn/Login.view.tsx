import React from 'react';
import {Text, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import SignUpTextInput from '../../components/SignUpTextInput';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

interface LoginViewProps {
    password: string;
    email: string;
    setPassword: (text: string) => void;
    setEmail: (text: string) => void;
    toggleShowPassword: () => void;
    onLogin: () => void;
    onForgotPassword: () => void;
    onSignUp: () => void;
    showPassword: boolean;
}

export default function LoginView({
                                      password,
                                      email,
                                      setPassword,
                                      setEmail,
                                      toggleShowPassword,
                                      onLogin,
                                      onForgotPassword,
                                      onSignUp,
                                      showPassword,
                                  }: LoginViewProps) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
                <Image style={{width: 96, height: 48, marginVertical: 112}}
                       source={require('../../assets/images/img_logo.png')}
                       resizeMode="contain"
                />
            </View>
            <View style={{flexDirection: 'column', paddingHorizontal: 24}}>
                <View style={{marginTop: 24}}>
                    <SignUpTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="아이디(이메일)"
                    />
                    <View style={{position: 'relative'}}>
                        <SignUpTextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={toggleShowPassword}
                            style={{position: 'absolute', right: 10, top: 15}}>
                            <Image
                                source={require('../../assets/images/img_visible_password.png')}
                                style={{width: 20, height: 14}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{marginTop: 112, backgroundColor: '#20B767', borderRadius: 12, padding: 20}}
                                  onPress={onLogin}>
                    <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>로그인</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 12,
                    }}>
                    <TouchableOpacity onPress={onForgotPassword}>
                        <Text>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onForgotPassword}>
                        <Text style={{color: 'grey'}}>|</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSignUp}>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
