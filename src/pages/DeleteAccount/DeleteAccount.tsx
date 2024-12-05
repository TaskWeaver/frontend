import {Pressable, SafeAreaView, Text, View} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import React from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

export default function DeleteAccount() {
    const {navigation} = useCustomNavigation();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
                    style={{position: 'absolute', left: 16}}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: 15,
                    }}>
                    탈퇴하기
                </Text>
            </View>

            <View style={{height: 2, backgroundColor: '#FAFAFA', marginBottom: 20}}/>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 24}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                    <Text style={{color: '#20B767', fontSize: 16}}>Task Weaver</Text>
                    <Text style={{fontSize: 16}}>서비스를 이용해주셔서 감사합니다.</Text>
                </View>
                <View style={{marginTop: 12}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4}}>
                        <Text style={{fontWeight: '700', fontSize: 16}}>탈퇴</Text>
                        <Text style={{fontSize: 16}}>하시겠습니까?</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
                        <Text style={{fontSize: 14, color: '#999999', fontWeight: '500', textAlign: 'center'}}>
                            {'탈퇴 시 해당 계정의 내용이 전부 삭제되며, 되돌릴 수 없습니다.\n\n팀장 또는 프로젝트 담당자의 권한을 가지고 있는 경우,\n담당자 변경 후 탈퇴가 가능합니다.'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 40, paddingHorizontal: 24}}>
                <Pressable style={{backgroundColor: '#20B767', padding: 20, alignItems: 'center', borderRadius: 8}}>
                    <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
                        탈퇴하기
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
