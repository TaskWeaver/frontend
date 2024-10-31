import React, {useCallback, useRef} from 'react';
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
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {RootState} from '../../app/store.ts';
import {removeTeam} from '../../features/team/teamSlice';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type ManageTeamRouteProp = RouteProp<
  {ManageTeam: {teamId: string}},
  'ManageTeam'
>;

const ManageTeamContainer = () => {
  const {navigation} = useCustomNavigation();
  const dispatch = useDispatch();
  const route = useRoute<ManageTeamRouteProp>();
  const {teamId} = route.params;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['30%'], []);

  const team = useSelector((state: RootState) =>
    state.team.teams.find((t) => t.id === teamId)
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleEditTeam = () => {
    // Navigate to team edit screen or open edit modal
    bottomSheetModalRef.current?.close();
    // Example: navigation.navigate('EditTeam', { teamId });
  };

  const handleDeleteTeam = () => {
    // Show confirmation dialog before deleting
    Alert.alert('팀 삭제', '정말로 이 팀을 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
        onPress: () => bottomSheetModalRef.current?.close(),
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          dispatch(removeTeam(teamId));
          bottomSheetModalRef.current?.close();
          navigation.goBack();
        },
      },
    ]);
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleDismissModalPress}
      />
    ),
    [handleDismissModalPress]
  );

  if (!team) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Text>팀을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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

          <View
            style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 24}}>
            <View style={styles.teamInfoContainer}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamDescription}>{team.description}</Text>
              <Pressable
                style={styles.moreOptionsButton}
                onPress={handlePresentModalPress}>
                <Text>옵션</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
        <BottomSheet
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}>
          <View style={styles.bottomSheetContent}>
            <Pressable onPress={handleEditTeam} style={styles.bottomSheetItem}>
              <Text style={styles.bottomSheetText}>팀 정보 수정</Text>
            </Pressable>
            <Pressable
              onPress={handleDeleteTeam}
              style={styles.bottomSheetItem}>
              <Text style={[styles.bottomSheetText, {color: 'red'}]}>
                팀 삭제
              </Text>
            </Pressable>
          </View>
        </BottomSheet>
      </BottomSheetModalProvider>
    </>
  );
};

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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetItem: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomSheetText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'medium',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ManageTeamContainer;
