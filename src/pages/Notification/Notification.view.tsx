import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateTeamMemberStatus} from '../../features/team/teamSlice';
import {RootState} from '../../app/store';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

interface Notification {
    id: number;
    content: string;
    sender: string;
    type: string;
    relatedTeamTitle: string;
    createdAt: string;
    relatedTypeId: string
}

export default function NotificationView() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tokenManager = new Token();

    // Redux에서 teams 가져오기
    const teams = useSelector((state: RootState) => state.team.teams);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        fetchUser();
    }, []);

    const handleEnter = async (teamId: number) => {
        const token = await tokenManager.getAccessToken();
        if (!token) {
            console.error('토큰이 유효하지 않습니다.');
            return;
        }

        try {
            const response = await service.team.acceptInvitation(token, teamId, 1);
            console.log('팀 초대 수락 응답:', response);

            // Redux 상태 업데이트
            dispatch(updateTeamMemberStatus({id: String(teamId), isMember: true}));

            // 알림 상태 업데이트
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.relatedTypeId === String(teamId)
                        ? {...notification, isAccepted: true}
                        : notification
                )
            );
        } catch (error) {
            console.error('팀 초대 수락 중 에러 발생:', error);
        }
    };

    const formatDateToKoreaTime = (invitedTime: string) => {
        const date = new Date(invitedTime);

        const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

        const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
        const day = String(koreaTime.getDate()).padStart(2, '0');
        const hours = String(koreaTime.getHours()).padStart(2, '0');
        const minutes = String(koreaTime.getMinutes()).padStart(2, '0');

        return `${month}.${day} ${hours}:${minutes}`;
    };

    const fetchUser = async () => {
        const token = await tokenManager.getAccessToken();
        if (!token) {
            return;
        }

        try {
            const response = await service.user.getProfile(token);
            setName(response.nickname);
        } catch (error) {
            console.error('유저 정보 가져오기 실패:', error);
        }
    };

    useLayoutEffect(() => {
        (async function () {
            const token = await tokenManager.getAccessToken();
            if (!token) {
                return;
            }

            try {
                const response = await service.user.getNotification(token);
                if (response?.result) {
                    // 알림 정렬
                    const sortedNotifications = response.result.sort(
                        (a: Notification, b: Notification) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setNotifications(sortedNotifications);
                }
            } catch (error) {
                console.error('알림 가져오기 실패:', error);
            }
        })();
    }, []);

    const renderItem = ({item}: { item: Notification }) => {
        // Redux의 팀 목록에서 해당 팀이 존재하는지 확인
        const isAccepted = teams.some((team) => team.id === item.relatedTypeId);

        return (
            <View style={styles.notificationContainer}>
                <Text style={styles.notificationTitle}>TaskWeaver</Text>
                <Text style={styles.notificationContent}>
                    {`${name}님, ${item.relatedTeamTitle}팀에 초대되었습니다.`}
                </Text>
                <Text style={styles.notificationTime}>
                    {formatDateToKoreaTime(item.createdAt)}
                </Text>
                <Pressable
                    style={[
                        styles.enterButton,
                        isAccepted && styles.enterButtonDisabled,
                    ]}
                    onPress={() => handleEnter(Number(item.relatedTypeId))}
                    disabled={isAccepted}>
                    <Text style={styles.enterButtonText}>
                        {isAccepted ? '참여 완료' : '참여하기'}
                    </Text>
                </Pressable>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text style={styles.title}>알림</Text>
            </View>
            <View style={styles.divider}/>
            <View style={styles.mainContent}>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>알림이 없습니다.</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        height: 3,
        backgroundColor: '#FAFAFA',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    notificationContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
        borderBottomWidth: 1,
        borderColor: '#C7C7C9',
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationContent: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: '500',
    },
    notificationTime: {
        fontSize: 14,
        marginTop: 10,
        fontWeight: '400',
    },
    enterButton: {
        marginTop: 24,
        alignSelf: 'flex-start',
        backgroundColor: '#20B767',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    enterButtonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    enterButtonText: {
        fontWeight: '700',
        fontSize: 14,
        color: 'white',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});
