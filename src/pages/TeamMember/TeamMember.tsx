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
import EditIcon from '../../assets/svg/ic_editIcon.tsx';
import TrashIcon from '../../assets/svg/ic_trash.tsx';

type TeamMemberRouteProp = RouteProp<
    { ManageTeam: { teamId: string } },
    'ManageTeam'
>;

const TeamMember = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const {navigation} = useCustomNavigation();
    const route = useRoute<TeamMemberRouteProp>();
    const {teamId} = route.params;

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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 18,
                }}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                        팀 멤버({team?.members.length})
                    </Text>
                    <Pressable onPress={handlePresentSheet}>
                        <IcMoreButton color={'black'} style={styles.rotatedIcon}/>
                    </Pressable>
                </View>

                <Text style={{fontWeight: '600', fontSize: 15, marginVertical: 14}}>팀장</Text>
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
                        <Image style={{position: 'absolute', left: 48, top: 48, width: 20, height: 20}}
                               source={require('../../assets/images/img_team_leader.png')}/>
                        <Text style={styles.cardText}>{leader.nickname}</Text>
                    </View>
                )}

                <Text style={{fontWeight: '600', fontSize: 15, marginBottom: 14, marginTop: 30}}>팀원</Text>
                {members && members.map((member) => (
                    <View key={member.id} style={styles.card}>
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
                ))}
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                index={isBottomSheetOpen ? 0 : -1}
                backdropComponent={renderBackdrop}
                containerStyle={{borderRadius: 18}}
                snapPoints={snapPoints}
                onChange={(index) => setIsBottomSheetOpen(index === 0)}
                enablePanDownToClose
                handleIndicatorStyle={{backgroundColor: '#d9d9d9', marginBottom: 8}}
                style={styles.bottomSheet}>
                <BottomSheetView style={styles.bottomSheetContent}>
                    <Pressable style={styles.bottomSheetItem}>
                        <EditIcon/>
                        <Text style={styles.bottomSheetText}>팀장 변경하기</Text>
                    </Pressable>
                    <Pressable style={styles.bottomSheetItem}>
                        <TrashIcon/>
                        <Text style={[styles.bottomSheetText, styles.deleteText]}>
                            팀원 관리하기
                        </Text>
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
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        padding: 20,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 25,
        marginRight: 20,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
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
    },
    deleteText: {
        color: 'red',
    },
});

export default TeamMember;
