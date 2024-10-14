import React from 'react';
import {View, Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import PlusFriends from '../../assets/svg/ic_plusFriends.tsx';
import {IcNotification} from '../../assets/svg';

const ManageTeamContainer = () => {
  const {navigation} = useCustomNavigation();

  const handleBackPress = () => {
    navigation.goBack();
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

      <View style={styles.main}></View>
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
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  divider: {
    height: 2,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
});

export default ManageTeamContainer;
