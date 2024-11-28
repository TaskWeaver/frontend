import React, {useCallback, useRef, useState} from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcMoreButton from '../../assets/svg/ic_moreButton.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store.ts';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {
    BottomSheetDefaultBackdropProps,
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import CheckBox from '@react-native-community/checkbox';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

type TeamMemberRouteProp = RouteProp<
    { ManageTeam: { teamId: string } },
    'ManageTeam'
>;

const TeamMember = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isManageMode, setIsManageMode] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<Record<string, boolean>>({});

    const {navigation} = useCustomNavigation();
    const route = useRoute<TeamMemberRouteProp>();
    const {teamId} = route.params;

    const tokenManager = new Token();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const team = useSelector((state: RootState) =>
        state.team.teams.find((t) => t.id === teamId)
    );

    const snapPoints = React.useMemo(() => ['19%'], []);

    const handlePresentSheet = () => {
        setIsBottomSheetOpen(true);
        bottomSheetRef.current?.snapToIndex(0);
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

    const handleToggleManageMode = () => {
        setIsManageMode(!isManageMode);
        setSelectedMembers({});
        bottomSheetRef.current?.close();
    };

    const handleDeleteMembers = async () => {
        const selectedIds = Object.keys(selectedMembers).filter((id) => selectedMembers[id]);
        const accessToken = await tokenManager.getAccessToken();

        if (selectedIds.length === 0) {
            return;
        }

        if (!accessToken) {
            return;
        }

        try {
            await service.team.deleteMember(accessToken, teamId, selectedIds);

            setIsManageMode(false);
            setSelectedMembers({});
        } catch (e) {
            console.error('API 호출 에러:', e);
        }
    };

    const toggleMemberSelection = (id: string) => {
        setSelectedMembers((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const leader = team?.members.find((member) => member.role === 'LEADER');
    const members = team?.members.filter((member) => member.role === 'MEMBER');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text style={styles.title}>멤버</Text>
            </View>

            <View style={styles.divider}/>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.teamInfo}>
                    <Text style={styles.subtitle}>
                        팀 멤버({team?.members.length})
                    </Text>
                    {!isManageMode && (
                        <Pressable onPress={handlePresentSheet}>
                            <IcMoreButton color={'black'} style={styles.rotatedIcon}/>
                        </Pressable>
                    )}
                    {isManageMode && (
                        <View style={styles.manageButtons}>
                            <Pressable onPress={handleToggleManageMode} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>취소</Text>
                            </Pressable>
                            <Pressable onPress={handleDeleteMembers} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>삭제</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitleLeader}>팀장</Text>
                {leader && (
                    <View style={styles.card}>
                        <Image
                            source={
                                leader.imageUrl === 'domain 주소'
                                    ? require('../../assets/images/img_user_no_profile.png')
                                    : {uri: leader.imageUrl}
                            }
                            style={styles.profileImage}
                        />
                        <Image style={{position: 'absolute', left: 46, top: 46, width: 20, height: 20}}
                               source={require('../../assets/images/img_team_leader.png')}/>
                        <Text style={styles.cardText}>{leader.nickname}</Text>
                    </View>
                )}

                <Text style={styles.sectionTitleMember}>팀원</Text>
                {members && members.map((member) => (
                    <View key={member.id} style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12}}>
                        {isManageMode && (
                            <CheckBox
                                value={selectedMembers[member.id]}
                                onValueChange={() => toggleMemberSelection((member.id))}
                                boxType={'square'}
                                tintColor={'#000000'}
                                animationDuration={0}
                                onFillColor={'#20B767'}
                                onTintColor={'#20B767'}
                                onCheckColor={'#FFFFFF'}
                                lineWidth={2}
                                style={{width: 20, height: 20}}
                            />
                        )}
                        <View style={styles.card}>
                            <Image
                                source={
                                    member.imageUrl === 'domain 주소' || member.imageUrl === null
                                        ? require('../../assets/images/img_user_no_profile.png')
                                        : {uri: member.imageUrl}
                                }
                                style={styles.profileImage}
                            />
                            <Text style={styles.cardText}>{member.nickname}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                index={isBottomSheetOpen ? 0 : -1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                onChange={(index) => setIsBottomSheetOpen(index === 0)}
                enablePanDownToClose
                style={styles.bottomSheet}>
                <BottomSheetView style={styles.bottomSheetContent}>
                    <Pressable style={styles.bottomSheetItem} onPress={handleToggleManageMode}>
                        <Text style={styles.bottomSheetText}>팀장 변경하기</Text>
                    </Pressable>
                    <Pressable style={styles.bottomSheetItem} onPress={handleToggleManageMode}>
                        <Text style={styles.bottomSheetText}>팀원 관리하기</Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    );
};

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
        marginBottom: 15,
    },
    divider: {
        height: 2,
        backgroundColor: '#FAFAFA',
    },
    rotatedIcon: {
        transform: [{rotate: '90deg'}],
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    teamInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    manageButtons: {
        flexDirection: 'row',
    },
    deleteButton: {
        padding: 4,
    },
    deleteButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    cancelButton: {
        padding: 4,
    },
    cancelButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionTitleLeader: {
        fontWeight: '600',
        fontSize: 15,
        marginVertical: 14,
    },
    sectionTitleMember: {
        fontWeight: '600',
        fontSize: 15,
        marginTop: 30,
        marginBottom: 14,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        padding: 18,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 20,
    },
    cardText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
    },
    bottomSheet: {
        backgroundColor: 'white',
        shadowColor: '#000',
        borderRadius: 18,
    },
    bottomSheetContent: {
        flex: 1,
        paddingBottom: 16,
        borderRadius: 18,
        paddingHorizontal: 24,
    },
    bottomSheetItem: {
        paddingVertical: 8,
        marginVertical: 4,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    bottomSheetText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    deleteText: {
        color: 'red',
    },
});

export default TeamMember;
