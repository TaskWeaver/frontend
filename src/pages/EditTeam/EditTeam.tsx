import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import SignUpTextInput from '../../components/SignUpTextInput';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {service} from '../../domains';
import AsyncStorageService from '../../storage/AsyncStorage.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {updateTeam} from '../../features/team/teamSlice.ts';
import {useDispatch} from 'react-redux';

type EditTeamPageRouteProp = RouteProp<
    { EditTeam: { teamName: string; teamDescription: string; teamId: string } },
    'EditTeam'
>;

const EditTeamPage = () => {
    const asyncStorageService = new AsyncStorageService();
    const {navigation} = useCustomNavigation();
    const dispatch = useDispatch();
    const route = useRoute<EditTeamPageRouteProp>();
    const {teamName: tn, teamDescription: td, teamId} = route.params;

    const [teamName, setTeamName] = useState(tn);
    const [teamDescription, setTeamDescription] = useState(td);
    const [isFormValid, setIsFormValid] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setIsFormValid(teamName.length > 0 && teamDescription.length > 0);
    }, [teamName, teamDescription]);

    const handleEditTeam = async () => {
        if (isFormValid) {
            try {
                const token = await asyncStorageService.getAccessToken();
                if (token) {
                    const response = await service.team.editTeam(
                        token,
                        teamName,
                        teamDescription,
                        teamId
                    );

                    if (response.resultCode === 200) {
                        // Redux에 상태 업데이트
                        dispatch(
                            updateTeam({
                                id: teamId,
                                name: teamName,
                                description: teamDescription,
                            })
                        );

                        setModalVisible(true);
                    }
                } else {
                    return null;
                }
            } catch (e) {
                throw e;
            }
        }
    };

    const handleModalConfirm = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text style={styles.title}>팀 수정하기</Text>
            </View>

            <View style={styles.divider}/>

            <View style={{flex: 1, paddingHorizontal: 30}}>
                <View style={styles.form}>
                    <View style={{marginBottom: 20, marginTop: 30}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>팀 이름</Text>
                        <SignUpTextInput
                            value={teamName}
                            onChangeText={setTeamName}
                            placeholder="팀 이름을 입력해주세요."
                        />
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>팀 소개</Text>
                        <SignUpTextInput
                            value={teamDescription}
                            onChangeText={setTeamDescription}
                            placeholder="팀 소개를 입력해주세요."
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.createButton,
                        {backgroundColor: isFormValid ? '#20B767' : '#A9A9A9'},
                    ]}
                    onPress={handleEditTeam}
                    disabled={!isFormValid}>
                    <Text style={styles.createButtonText}>수정</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>팀 수정이 완료되었습니다.</Text>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleModalConfirm}>
                            <Text style={styles.confirmButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 30,
    },
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
        height: 2,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
    },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    createButton: {
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 50,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 30,
    },
    modalText: {
        fontSize: 15,
        marginBottom: 3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#CCF0DD',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 16,
        width: '100%',
    },
    confirmButtonText: {
        color: '#078E47',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EditTeamPage;
