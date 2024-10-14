import React from 'react';
import {View, Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import {useNavigation} from '@react-navigation/native';

export default function NotificationView() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <IcLeftArrow size={24} />
        </Pressable>
        <Text style={styles.title}>알림</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.mainContent}></View>
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
    padding: 16,
  },
});
