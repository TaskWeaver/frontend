import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import React from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

export default function FindPassword() {
    const {navigation} = useCustomNavigation();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{
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
                    style={{position: 'absolute', left: 16}}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: 15,
                }}>비밀번호 찾기</Text>
            </View>

            <View style={{height: 2, backgroundColor: '#FAFAFA', marginBottom: 20}}/>

            <View style={{flex: 1, paddingHorizontal: 24, marginTop: 24}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}>아이디</Text>
                <TextInput placeholder={'이메일을 입력해주세요'} placeholderTextColor={'#C7C7C9'}
                           style={{paddingVertical: 14, borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}/>
            </View>
            <View style={{paddingHorizontal: 24, marginBottom: 36}}>
                <Pressable style={{backgroundColor: '#20B767', borderRadius: 8, padding: 16}}>
                    <Text style={{color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 16}}>본인인증</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
