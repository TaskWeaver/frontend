import {
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import React, {useState} from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {service} from '../../domains';

export default function FindPassword() {
    const {navigation} = useCustomNavigation();

    const [email, setEmail] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleAuthorization = async () => {
        try {
            const response = await service.account.sendAuthCode(email);

            if (response.resultCode === 200 || response.resultCode === 201) {
                navigation.navigate('MainStack', {
                    screen: 'FindPasswordAuth',
                    params: {email: email, authCode: response.result.certificationNum},
                });
            }
        } catch (e: any) {
            if (e.response?.status === 400 || e.response?.status === 404) {
                setModalVisible(true);
            } else {
                console.error('Unexpected error:', e);
            }
        }
    };

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
                    비밀번호 찾기
                </Text>
            </View>

            <View style={{height: 2, backgroundColor: '#FAFAFA', marginBottom: 20}}/>

            <View style={{flex: 1, paddingHorizontal: 24, marginTop: 24}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}>아이디</Text>
                <TextInput
                    placeholder={'이메일을 입력해주세요'}
                    onChangeText={(text) => {
                        setEmail(text.trim());
                    }}
                    placeholderTextColor={'#C7C7C9'}
                    style={{
                        paddingVertical: 14,
                        borderBottomColor: '#EAEAEA',
                        borderBottomWidth: 1,
                    }}
                />
            </View>
            <View style={{paddingHorizontal: 24, marginBottom: 36}}>
                <Pressable
                    onPress={handleAuthorization}
                    disabled={!email}
                    style={{
                        backgroundColor: email ? '#20B767' : '#A9D8BC',
                        borderRadius: 8,
                        padding: 16,
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '600',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        본인인증
                    </Text>
                </Pressable>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 20,
                            alignItems: 'center',
                            width: '80%',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginBottom: 16,
                                color: 'black',
                            }}>
                            존재하지 않는 아이디
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'center',
                                color: 'gray',
                                marginBottom: 20,
                                lineHeight: 24,
                            }}>
                            {'해당 이메일이 존재하지 않습니다.\n다시 확인해주세요.'}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                backgroundColor: '#CCF0DD',
                                borderRadius: 8,
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                width: '100%',
                            }}>
                            <Text style={{
                                color: '#20B767',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 16,
                            }}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
