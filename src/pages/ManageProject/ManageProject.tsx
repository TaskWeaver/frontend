import React, { useCallback, useEffect, useRef, useState } from 'react';
import {SafeAreaView, View, Text, Pressable, StyleSheet, Image, Modal, TouchableOpacity} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IcNotification} from '../../assets/svg';
import dayjs from 'dayjs';
import IcMoreButton from '../../assets/svg/ic_moreButton.tsx';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import EditIcon from '../../assets/svg/ic_editIcon.tsx';
import TrashIcon from '../../assets/svg/ic_trash.tsx';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { service } from '../../domains/index.ts';

type ManageProjectRouteProp = RouteProp<
    { ManageProject: { projectId: number, name: string, description: string, status: string, createdAt: string, teamId: string } },
    'ManageProject'
>;

export default function ManageProject() {
    const {navigation} = useCustomNavigation();
    const route = useRoute<ManageProjectRouteProp>();
    const {name, status, createdAt, projectId, teamId} = route.params;
    const snapPoints = React.useMemo(() => ['18%'], []);

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [isLoading, setIsLoading] = useState(false);

    const statusOptions = [
        { value: 0, text: '진행 전', backgroundColor: '#FFCACE', color: '#FF0000' },
        { value: 1, text: '진행 중', backgroundColor: '#CCF0DD', color: '#20B767' },
        { value: 2, text: '진행 완료', backgroundColor: '#EEECEC', color: '#959595' },
    ];

    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        fetchTasks();
    });

    const fetchTasks = async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            await service.team.getTasks(token, teamId, String(projectId));
        } catch(e) {
            throw e;
        }   
    }

    const handleNotification = () => {
        navigation.navigate('MainStack', {screen: 'Notification'});
    };

    const formattedDate = dayjs(createdAt).format('YYYY.MM.DD');

    const handleStatusChange = (newStatus: string) => {
        setSelectedStatus(newStatus);
    };

    const handlePresentSheet = () => {
        setIsBottomSheetOpen(true);
        bottomSheetRef.current?.snapToIndex(0);
    };

    const handleConfirmStatus = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            await service.team.changeStatus(token, String(projectId), Number(selectedStatus));
            setIsStatusModalVisible(false);
        } catch (error) {
            console.error('Failed to change status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );
    
    const getStatusStyles = () => {
        if (status === 'BEFORE') {
            return {
                backgroundColor: '#FFCACE',
                color: '#FF0000',
                text: '진행 전',
            };
        }
        if (status === 'START') {
            return {
                backgroundColor: '#CCF0DD',
                color: '#20B767',
                text: '진행 중',
            };
        }
        return {backgroundColor: '#E0E0E0', color: '#000', text: '알 수 없음'};
    };

    const statusStyles = getStatusStyles();

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
                    {name}
                </Text>
                <View style={styles.rightButton}>
                    <Pressable style={styles.icon} onPress={handleNotification}>
                        <IcNotification size={24}/>
                    </Pressable>
                </View>
            </View>

            <View style={{height: 2, backgroundColor: '#FAFAFA', marginBottom: 20}}/>

            <View style={{flex: 1, paddingHorizontal: 24}}>
            <Pressable
                    style={[styles.statusContainer, {backgroundColor: statusStyles.backgroundColor}]}>
                    <Text style={[styles.statusText, {color: statusStyles.color}]}>
                        {statusStyles.text}
                    </Text>
                </Pressable>
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{name}의 TimeLine</Text>
                        <Text style={{fontSize: 13, fontWeight: '400', marginTop: 4}}>{formattedDate} ~</Text>
                    </View>
                    <View>
                    <Pressable
                        style={{
                            position: 'absolute',
                            right: 0,
                            zIndex: 1,
                            padding: 2,
                        }}
                        onPress={handlePresentSheet}>
                        <IcMoreButton color={'black'}/>
                    </Pressable>
                    </View>
                </View>
                <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/images/img_main_empty.png')}
                           style={{
                               width: 240,
                               height: 260,
                           }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
                        <Text style={{fontSize: 16}}>아직</Text>
                        <Text style={{fontSize: 16, marginLeft: 4, color: '#20B767', fontWeight: '700'}}>{name}팀</Text>
                        <Text style={{fontSize: 16}}>의</Text>
                        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 3}}>Task</Text>
                        <Text style={{fontSize: 16}}>가 없습니다.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                        <Text style={{fontSize: 16, marginRight: 4}}>새로운</Text>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Task</Text>
                        <Text style={{fontSize: 16}}>를 추가해주세요.</Text>
                    </View>
                    <Pressable 
                        onPress={() => {    
                            navigation.navigate('MainStack', {screen: 'CreateTask', params: {projectId: projectId, projectName: name, teamId: teamId}})  
                        }}
                        style={{
                            backgroundColor: '#20B767',
                            borderRadius: 8,
                            width: '100%',
                            padding: 16,
                            marginTop: 240,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Task 추가하기</Text>
                    </Pressable>
                </View>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={isBottomSheetOpen ? 0 : -1}
                backdropComponent={renderBackdrop}
                containerStyle={{borderRadius: 18}}
                snapPoints={snapPoints}
                onChange={(index) => setIsBottomSheetOpen(index === 0)}
                enablePanDownToClose
                handleIndicatorStyle={{backgroundColor: '#d9d9d9', marginBottom: 8}}
                style={{
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    borderRadius: 18,
                }}>
                <BottomSheetView style={{
        flex: 1,
        paddingBottom: 16,
        borderRadius: 18,
        paddingHorizontal: 24,
    }}>
                    <Pressable style={{
        paddingVertical: 8,
        marginVertical: 4,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    }}>
                        <EditIcon/>
                        <Text style={{
        fontSize: 14,
        fontWeight: 'bold',
    }}>팀 수정하기</Text>
                    </Pressable>
                    <Pressable style={{
        paddingVertical: 8,
        marginVertical: 4,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    }}>
                        <TrashIcon/>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: 'red',
                        }}>
                            팀 삭제하기
                        </Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheet>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isStatusModalVisible}
                onRequestClose={() => setIsStatusModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>프로젝트 상태를 변경하세요</Text>
                        
                        {statusOptions.map((option) => (
                            <Pressable
                                key={option.value}
                                style={[
                                    styles.statusOption,
                                    { backgroundColor: Number(selectedStatus) === option.value ? option.backgroundColor : 'transparent' }
                                ]}
                                onPress={() => handleStatusChange(String(option.value))}>
                                <Text style={[
                                    styles.statusOptionText,
                                    { 
                                        color: Number(selectedStatus) === option.value ? option.color : '#000000',
                                        fontWeight: Number(selectedStatus) === option.value ? '700' : '400'
                                    }
                                ]}>
                                    {option.text}
                                </Text>
                            </Pressable>
                        ))}

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setIsStatusModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>취소</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.confirmButton]}
                                disabled={isLoading}
                                onPress={handleConfirmStatus}>
                                <Text style={styles.confirmButtonText}>
                                    {isLoading ? '변경중...' : '확인'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 16,
    },
    icon: {
        marginLeft: 16,
    },
    statusContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 8,
        borderRadius: 4,
    },
    statusText: {
        fontWeight: '700',
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
    },
    statusOption: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 12,
    },
    statusOptionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
    },
    confirmButton: {
        backgroundColor: '#20B767',
    },
    cancelButtonText: {
        color: '#666666',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});
