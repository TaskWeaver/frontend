import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import Ic_plusFriends from '../../assets/svg/ic_plusFriends.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store.ts';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

type CreateProjectRouteProp = RouteProp<
    { CreateProject: { teamId: string } },
    'CreateProject'
>;

export default function CreateProject() {
    const {navigation} = useCustomNavigation();
    const route = useRoute<CreateProjectRouteProp>();
    const {teamId} = route.params;
    const tokenManager = new Token();

    const team = useSelector((state: RootState) =>
        state.team.teams.find((t) => t.id === teamId)
    );

    const [user, setUser] = useState({id: '', nickname: '', imageUrl: ''});
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = await tokenManager.getAccessToken();

        if (!token) {
            return;
        }

        const response = await service.user.getProfile(token);

        setUser({id: response.id, nickname: response.nickname, imageUrl: response.imageUrl});

        setSelectedMembers([response.id]);
    };

    if (!team) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>팀 정보를 불러올 수 없습니다.</Text>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const toggleMemberSelection = (memberId: string) => {
        if (memberId === user.id) {
            return;
        }

        setSelectedMembers((prev) =>
            prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
        );
    };

    const handleProject = async () => {
        const token = await tokenManager.getAccessToken();

        if (!token) {
            return;
        }

        // Convert selectedMembers to a list of numbers
        const memberIdList = selectedMembers.map((id) => Number(id));

        try {
            const response = await service.team.createProject(
                token,
                teamId,
                projectTitle,
                projectDescription,
                Number(user.id),
                memberIdList
            );


            if (response.resultCode === 200 || response.resultCode === 201) {
                navigation.goBack();
            }

        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const renderTeamMember = ({item}: { item: { id: string; nickname: string; imageUrl: string } }) => (
        <Pressable onPress={() => toggleMemberSelection(item.id)}
                   style={[styles.teamMemberContainer, selectedMembers.includes(item.id) && styles.selectedMemberImage,
                   ]}>
            <Image
                source={
                    item.imageUrl === 'domain 주소' || item.imageUrl === null
                        ? require('../../assets/images/img_user_no_profile.png')
                        : {uri: item.imageUrl}
                }
                style={[
                    styles.memberImage,
                ]}
            />
            <Text style={styles.memberName}>{item.nickname}</Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text style={styles.title}>프로젝트 추가</Text>
            </View>

            <View style={styles.divider}/>

            <View style={{flex: 1, paddingHorizontal: 24}}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>프로젝트 제목</Text>
                    <TextInput
                        value={projectTitle}
                        onChangeText={setProjectTitle}
                        placeholder="프로젝트 제목을 입력해주세요"
                        style={styles.inputField}
                    />
                </View>

                <View style={{marginTop: 36}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>프로젝트 담당자 및 참여자</Text>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 100}}>
                        <FlatList
                            data={selectedMembers.map((id) =>
                                team.members.find((member) => member.id === id)
                            )}
                            keyExtractor={(item) => item?.id ?? ''}
                            renderItem={({item}) => (
                                <View style={styles.memberCard}>
                                    <Image
                                        source={
                                            item?.imageUrl === 'domain 주소' || item?.imageUrl === null
                                                ? require('../../assets/images/img_user_no_profile.png')
                                                : {uri: item?.imageUrl}
                                        }
                                        style={styles.memberImage}
                                    />
                                    <Text style={{
                                        fontWeight: '500',
                                        lineHeight: 16,
                                        marginTop: 8,
                                    }}>{item?.nickname}</Text>
                                </View>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingVertical: 20}}
                        />
                        <Pressable onPress={() => setModalVisible(true)} style={styles.addMemberButton}>
                            <Ic_plusFriends/>
                        </Pressable>
                    </View>
                </View>

                <View style={{marginTop: 36}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 12}}>프로젝트 설명</Text>
                    <TextInput
                        value={projectDescription}
                        onChangeText={setProjectDescription}
                        placeholder="프로젝트 설명을 입력해주세요"
                        multiline
                        style={styles.descriptionField}
                    />
                </View>
            </View>

            <View style={{flex: 1, paddingHorizontal: 24, marginTop: 560}}>
                <Pressable onPress={handleProject}
                           style={{alignItems: 'center', backgroundColor: '#20B767', borderRadius: 8, padding: 18}}>
                    <Text style={{color: 'white', fontWeight: '700'}}>다음</Text>
                </Pressable>
            </View>

            <Modal visible={isModalVisible} transparent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>프로젝트 참여자 선택</Text>
                        <FlatList
                            data={team.members}
                            keyExtractor={(item) => item.id}
                            renderItem={renderTeamMember}
                            contentContainerStyle={{paddingVertical: 10}}
                        />
                        <View style={styles.modalActions}>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>닫기</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    },
    divider: {
        height: 2,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
    },
    inputField: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        paddingVertical: 12,
    },
    descriptionField: {
        fontSize: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        textAlignVertical: 'top',
        minHeight: 200,
    },
    memberCard: {
        alignItems: 'center',
        marginRight: 16,
    },
    memberImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    memberName: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
    addMemberButton: {
        marginTop: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        width: '100%',
        padding: 16,
        backgroundColor: '#CCF0DD',
        borderRadius: 8,
    },
    cancelButtonText: {
        textAlign: 'center',
        color: '#078E47',
        fontWeight: '700',
    },
    confirmButton: {
        padding: 10,
        backgroundColor: '#20B767',
        borderRadius: 8,
    },
    confirmButtonText: {
        color: 'white',
    },
    teamMemberContainer: {
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedMemberImage: {
        backgroundColor: '#CCF0DD',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    errorText: {
        fontSize: 18,
        color: '#FF0000',
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
    },
});
