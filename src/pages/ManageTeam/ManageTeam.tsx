import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import PlusFriends from '../../assets/svg/ic_plusFriends.tsx';
import {IcNotification, IcPlus} from '../../assets/svg';
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
import EditIcon from '../../assets/svg/ic_editIcon.tsx';
import TrashIcon from '../../assets/svg/ic_trash.tsx';
import DownloadIcon from '../../assets/svg/ic_download.tsx';

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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [memberImail, setMemberImail] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['18%'], []);

  const team = useSelector((state: RootState) =>
    state.team.teams.find((t) => t.id === teamId)
  );

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '팀이 삭제되었습니다',
      position: 'top',
      topOffset: 80,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const handlePlusFriendsPress = () => {
    setInviteModalVisible(true);
  };

  const handleCloseInviteModal = () => {
    setInviteModalVisible(false);
  };

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

  const handleDeletePress = () => {
    handleCloseSheet();
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    const accessToken = await token.getAccessToken();
    if (!accessToken) return;
    navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
    await service.team.deleteTeam(accessToken, teamId);
    dispatch(removeTeam(teamId));
    setDeleteModalVisible(false);
    showToast();
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleInviteMember = async (teamId: string, email: string) => {
    const accessToken = await token.getAccessToken();
    if (!accessToken) return;

    const response = await service.team.inviteMember(
      accessToken,
      teamId,
      email
    );

    console.log(response);
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
          <Pressable onPress={handlePlusFriendsPress} style={styles.icon}>
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

      <View style={{paddingHorizontal: 24, marginTop: 40}}>
        <View
          style={{
            paddingHorizontal: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>팀 멤버</Text>
          <Pressable onPress={handlePlusFriendsPress}>
            <Ic_rightChevron size={14} />
          </Pressable>
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
      <View style={{paddingHorizontal: 24, marginTop: 60}}>
        <View
          style={{
            paddingHorizontal: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>프로젝트</Text>
          <IcPlus size={14} />
        </View>
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
            프로젝트를 추가해보세요
          </Text>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={handleDeleteCancel}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>팀을 삭제하시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleDeleteCancel}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeleteConfirm}>
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={inviteModalVisible}
        onRequestClose={handleCloseInviteModal}>
        <View style={styles.modalBackground}>
          <View style={styles.inviteModalContent}>
            <View style={{alignItems: 'flex-end'}}>
              <Pressable onPress={handleCloseInviteModal}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 40,
              }}>
              멤버를 추가하시겠습니까?
            </Text>
            <View>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                아이디로 추가
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder={'이메일을 입력해주세요'}
                  onChangeText={(text) => setMemberImail(text)}
                  style={{
                    paddingVertical: 15,
                    borderBottomColor: '#d9d9d9',
                    borderBottomWidth: 1,
                    width: '85%',
                    color: 'black',
                  }}
                />
                <Pressable
                  onPress={() => handleInviteMember(teamId, memberImail)}>
                  <IcPlus size={16} />
                </Pressable>
              </View>
            </View>
            <View style={{marginTop: 40}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                초대 링크로 추가
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 60,
                }}>
                <TextInput
                  placeholder={'이메일을 입력해주세요'}
                  style={{
                    paddingVertical: 15,
                    borderBottomColor: '#d9d9d9',
                    borderBottomWidth: 1,
                    width: '85%',
                  }}
                />
                <DownloadIcon width={16} height={16} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

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
          <Pressable onPress={handleEditTeam} style={styles.bottomSheetItem}>
            <EditIcon />
            <Text style={styles.bottomSheetText}>팀 수정하기</Text>
          </Pressable>
          <Pressable onPress={handleDeletePress} style={styles.bottomSheetItem}>
            <TrashIcon />
            <Text style={[styles.bottomSheetText, styles.deleteText]}>
              팀 삭제하기
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
    top: 4,
    right: 0,
    zIndex: 1,
    padding: 8,
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
    marginBottom: 16,
  },
  teamDescription: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
  },
  modalBackground: {
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
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#CCF0DD',
  },
  deleteButton: {
    backgroundColor: '#20B767',
  },
  cancelButtonText: {
    color: '#078E47',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inviteModalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ManageTeamContainer;
