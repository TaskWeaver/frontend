import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import PlusFriends from '../../assets/svg/ic_plusFriends.tsx';
import {IcNotification} from '../../assets/svg';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {RootState} from '../../app/store.ts';
import {removeTeam} from '../../features/team/teamSlice';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';
import IcMoreButton from '../../assets/svg/ic_moreButton.tsx';
import Ic_rightChevron from '../../assets/svg/ic_rightChevron.tsx';

type ManageTeamRouteProp = RouteProp<
  {ManageTeam: {teamId: string}},
  'ManageTeam'
>;

const ManageTeamContainer = () => {
  const {navigation} = useCustomNavigation();
  const dispatch = useDispatch();
  const route = useRoute<ManageTeamRouteProp>();
  const {teamId} = route.params;
  const token = new Token();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  // 스냅포인트 값을 퍼센트로 변경
  const snapPoints = React.useMemo(() => ['15%'], []);

  const team = useSelector((state: RootState) =>
    state.team.teams.find((t) => t.id === teamId)
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePresentSheet = () => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleEditTeam = () => {
    handleCloseSheet();
    // TODO: Add edit team navigation logic
  };

  const handleDeleteTeam = async () => {
    const accessToken = await token.getAccessToken();
    if (!accessToken) return;

    Alert.alert('팀 삭제', '정말로 이 팀을 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
        onPress: handleCloseSheet,
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          await service.team.deleteTeam(accessToken, teamId);
          dispatch(removeTeam(teamId));
          handleCloseSheet();
          navigation.goBack();
        },
      },
    ]);
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

  if (!team) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>팀을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBackPress} style={styles.backButton}>
          <IcLeftArrow size={24} />
        </Pressable>
        <Text style={styles.title}>팀 관리</Text>
        <View style={styles.rightButton}>
          <Pressable style={styles.icon}>
            <PlusFriends />
          </Pressable>
          <Pressable style={styles.icon}>
            <IcNotification size={24} />
          </Pressable>
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.teamInfoContainer}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamDescription}>{team.description}</Text>
          <Pressable
            style={styles.moreOptionsButton}
            onPress={handlePresentSheet}>
            <IcMoreButton />
          </Pressable>
        </View>
      </View>

      <View style={{paddingHorizontal: 24, marginTop: 80}}>
        <View
          style={{
            paddingHorizontal: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>팀 멤버</Text>
          <Ic_rightChevron size={14} />
        </View>
        {team.members.length > 0 ? (
          <View
            style={{
              padding: 18,
              borderWidth: 1,
              borderRadius: 8,
              borderStyle: 'solid',
              backgroundColor: '#FAFAFA',
              borderColor: '#F0F0F0',
            }}>
            <Text style={{color: '#C7C7C9', fontWeight: 'medium'}}>
              팀 멤버를 초대해보세요
            </Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={isBottomSheetOpen ? 0 : -1}
        backdropComponent={renderBackdrop}
        containerStyle={{shadowOpacity: 0}}
        snapPoints={snapPoints}
        onChange={(index) => setIsBottomSheetOpen(index === 0)}
        enablePanDownToClose
        handleIndicatorStyle={{backgroundColor: 'white'}}
        style={styles.bottomSheet}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <Pressable onPress={handleEditTeam} style={styles.bottomSheetItem}>
            <Text style={styles.bottomSheetText}>팀 정보 수정</Text>
          </Pressable>
          <Pressable onPress={handleDeleteTeam} style={styles.bottomSheetItem}>
            <Text style={[styles.bottomSheetText, styles.deleteText]}>
              팀 삭제
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
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
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
  rightButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  icon: {
    marginLeft: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  moreOptionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  moreOptionsText: {
    color: 'white',
    fontSize: 16,
  },
  bottomSheet: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    paddingBottom: 20,
  },
  bottomSheetItem: {
    paddingVertical: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteText: {
    color: 'red',
  },
  teamInfoContainer: {
    borderRadius: 8,
    backgroundColor: '#20B767',
    paddingVertical: 35,
    position: 'relative',
  },
  teamName: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 12,
  },
  teamDescription: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ManageTeamContainer;
