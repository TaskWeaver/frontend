import React, {useLayoutEffect, useState} from 'react';
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
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

interface Notification {
  id: number;
  content: string;
  isRead: string;
  sender: string;
  type: string;
}

export default function NotificationView() {
  const navigation = useNavigation();
  const tokenManager = new Token();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useLayoutEffect(() => {
    (async function () {
      const token = await tokenManager.getAccessToken();
      if (!token) return;

      try {
        const response = await service.user.getNotification(token);
        if (response?.result) {
          setNotifications(response.result);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    })();
  }, []);

  const renderItem = ({item}: {item: Notification}) => {
    if (item.type === 'TEAM') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 24,
            borderBottomWidth: 1,
            borderColor: '#C7C7C9',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>TaskWeaver</Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              fontWeight: 500,
            }}>
            {'사용자님이 팀에 초대되었습니다.'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              fontWeight: 300,
            }}>
            05.10 22:00
          </Text>
          <Pressable
            style={{
              marginTop: 24,
              alignSelf: 'flex-start',
              backgroundColor: '#20B767',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}>
            <Text style={{fontWeight: '700', fontSize: 14, color: 'white'}}>
              참여하기
            </Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={styles.notificationItem}>
          <Text style={styles.notificationContent}>{item.content}</Text>
          <Text style={styles.notificationMeta}>{item.type}</Text>
        </View>
      );
    }
  };

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
  notificationItem: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
  notificationContent: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMeta: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});
