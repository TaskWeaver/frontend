import React, {useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import PlusFriends from '../../assets/svg/ic_plusFriends.tsx';
import {IcNotification} from '../../assets/svg';
import BottomSheet from '@gorhom/bottom-sheet';

const ManageTeamContainer = () => {
  const {navigation} = useCustomNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null); // 바텀 시트 레퍼런스
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false); // 바텀 시트 표시 상태

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true); // 바텀 시트 표시 상태 변경
    bottomSheetRef.current?.expand(); // 바텀 시트를 열도록 설정
  };

  return (
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

      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 24}}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: '#20B767',
            paddingVertical: 35,
          }}>
          <Pressable style={styles.icon} onPress={handleOpenBottomSheet}>
            <Text style={{fontSize: 24}}>dk</Text>
          </Pressable>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 24,
              marginBottom: 12,
            }}>
            Team Name
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'medium',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Team 소개
          </Text>
        </View>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['25%', '50%']} // 바텀 시트 높이
        onClose={() => setIsBottomSheetVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetText}>팀 정보 수정</Text>
          <Text style={styles.bottomSheetText}>팀 삭제</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
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
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});

export default ManageTeamContainer;
