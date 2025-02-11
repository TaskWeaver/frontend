import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IcNotification } from '../../assets/svg';
import IcLeftArrow from '../../assets/svg/ic_leftArrow';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { service } from '../../domains';
import { RootState } from '../../app/store';
import Token from '../../domains/storage/Token';
import { ScrollView } from 'react-native-gesture-handler';

type CreateTaskRouteProp = RouteProp<
  { CreateTask: { projectId: string; projectName: string; teamId: string; } },
  'CreateTask'
>;

export default function CreateTask() {
    const { navigation } = useCustomNavigation();
    const route = useRoute<CreateTaskRouteProp>();
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [tempDate, setTempDate] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState({id: '', nickname: '', imageUrl: ''});
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const tokenManager = new Token();

    const team = useSelector((state: RootState) =>
        state.team.teams.find((t) => t.id === route.params.teamId)
    );

    useEffect(() => {
        const getUser = async () => {
            const token = await tokenManager.getAccessToken();

            if (!token) {
                return;
            }

            const response = await service.user.getProfile(token);
            setUser({id: response.id, nickname: response.nickname, imageUrl: response.imageUrl});
            setSelectedMembers([response.id]);
        };

        getUser();
    }, []);
  
    const handleNotification = () => {
      navigation.navigate('MainStack', { screen: 'Notification' });
    };
  
    const handleIconPress = (index: number) => {
      setSelectedIcon(index);
    };
  
    const handleDateChange = (event: any, selectedDate?: Date) => {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    };
  
    const confirmDateSelection = () => {
      setDueDate(new Date(tempDate.setHours(dueDate.getHours(), dueDate.getMinutes())));
      setShowDateModal(false);
    };
  
    const handleTimeChange = (event: any, selectedTime?: Date) => {
      if (selectedTime) {
        setTempDate(selectedTime);
      }
    };
  
    const confirmTimeSelection = () => {
      setDueDate(new Date(dueDate.setHours(tempDate.getHours(), tempDate.getMinutes())));
      setShowTimeModal(false);
    };
  
    const icons = [
      require('../../assets/images/icon_1.png'),
      require('../../assets/images/icon_2.png'),
      require('../../assets/images/icon_3.png'),
      require('../../assets/images/icon_4.png'),
      require('../../assets/images/icon_5.png'),
    ];

    const handleCreateTask = async () => {
        if (!taskTitle.trim()) {
            Alert.alert('Error', 'Task title is required');
            return;
        }
    
        const taskData = {
            request: {
                title: taskTitle,
                content: taskDescription,
                startDate: new Date().toISOString().split('T')[0],
                endDate: dueDate.toISOString().split('T')[0],
                members: selectedMembers.map(Number),
                emojiId: selectedIcon !== null ? selectedIcon + 1 : 1,
                parentTaskId: 0
            },
            images: []
        };
    
        try {
            setIsSubmitting(true);
            const token = await tokenManager.getAccessToken();
            if (!token) {
                return;
            }
            
            const response = await service.team.createTask(token, route.params.projectId, taskData);
            
            if (response.resultCode === 200 || response.resultCode === 201) {
                navigation.goBack();
            }
        } catch (error) {
            console.error('Task creation failed', error);
            Alert.alert('Error', 'Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleMemberSelection = (memberId: string) => {
        if (memberId === user.id) {
            return;
        }

        setSelectedMembers((prev) =>
            prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
        );
    };

    const renderTeamMember = ({item}: { item: { id: string; nickname: string; imageUrl: string } }) => (
        <Pressable 
            onPress={() => toggleMemberSelection(item.id)}
            style={[
                styles.teamMemberContainer, 
                selectedMembers.includes(item.id) && styles.selectedMemberImage
            ]}
        >
            <Image
                source={
                    item.imageUrl === 'domain 주소' || item.imageUrl === null
                        ? require('../../assets/images/img_user_no_profile.png')
                        : {uri: item.imageUrl}
                }
                style={styles.memberImage}
            />
            <Text style={styles.memberName}>{item.nickname}</Text>
        </Pressable>
    );

    const renderSelectedMembers = () => {
        if (!team) return null;
    
        return (
            <FlatList
                horizontal
                data={selectedMembers}
                keyExtractor={(memberId) => memberId}
                renderItem={({ item: memberId }) => {
                    const member = team.members.find(m => m.id === memberId);
                    if (!member) return null;
    
                    return (
                        <Image
                            source={
                                member.imageUrl === 'domain 주소' || member.imageUrl === null
                                    ? require('../../assets/images/img_user_no_profile.png')
                                    : {uri: member.imageUrl}
                            }
                            style={styles.selectedMemberProfileImage}
                        />
                    );
                }}
                contentContainerStyle={styles.selectedMembersScrollContainer}
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    const confirmMemberSelection = () => {
        setShowMemberModal(false);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 10,
          backgroundColor: '#fff',
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: 16 }}
        >
          <IcLeftArrow size={24} />
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 15,
          }}
        >
          태스크 추가
        </Text>
        <View style={styles.rightButton}>
          <Pressable style={styles.icon} onPress={handleNotification}>
            <IcNotification size={24} />
          </Pressable>
        </View>
      </View>
      <View style={{ height: 2, backgroundColor: '#FAFAFA' }} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
            {route.params.projectName}의 TimeLine
          </Text>
          <Text style={{ fontSize: 14, marginTop: 6 }}>
            프로젝트에 새로운 Task를 추가해보세요
          </Text>
        </View>
        <Text style={{ marginTop: 24, fontWeight: 'bold', fontSize: 16 }}>아이콘</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          {icons.map((icon, index) => (
            <Pressable key={index} onPress={() => handleIconPress(index)}>
              <Image
                source={icon}
                style={[
                  styles.iconImage,
                  selectedIcon === index
                    ? styles.selectedIcon
                    : styles.unselectedIcon,
                ]}
              />
            </Pressable>
          ))}
        </View>
        <Text style={{ marginTop: 24, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>태스크 제목</Text>
        <TextInput
          style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#EAEAEA',
                paddingVertical: 12,
            }}
          placeholder="태스크 제목을 입력하세요"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Text style={{ marginTop: 24, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>태스크 설명</Text>
        <TextInput
          style={{
            fontSize: 14,
            padding: 16,
            borderWidth: 1,
            borderColor: '#EAEAEA',
            borderRadius: 8,
            backgroundColor: '#F9F9F9',
            textAlignVertical: 'top',
            minHeight: 150,
          }}
          placeholder="태스크 설명을 입력하세요"
          multiline
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
        <Text style={{ marginTop: 24, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>마감 기한</Text>
        <View style={styles.dateTimeContainer}>
          <Pressable
            style={styles.dateTimeButton}
            onPress={() => {
              setTempDate(dueDate);
              setShowDateModal(true);
            }}
          >
            <Text style={styles.dateTimeButtonText}>
              {dueDate.toLocaleDateString('ko-KR')}
            </Text>
          </Pressable>
          <Pressable
            style={styles.dateTimeButton}
            onPress={() => {
              setTempDate(dueDate);
              setShowTimeModal(true);
            }}
          >
            <Text style={styles.dateTimeButtonText}>
              {dueDate.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 20 }}>
            <Text style={{ marginTop: 24, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
                프로젝트 멤버
            </Text>
            <Pressable 
                style={styles.addMemberButton} 
                onPress={() => setShowMemberModal(true)}
            >
                <View style={styles.selectedMembersContainer}>
                    {renderSelectedMembers()}
                    <Text style={styles.addMemberText}>+ 멤버 추가</Text>
                </View>
            </Pressable>
        </View>
        <Modal
          transparent={true}
          visible={showDateModal}
          animationType="fade"
          onRequestClose={() => setShowDateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>날짜 선택</Text>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                style={styles.inlineDatePicker}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowDateModal(false)}
                >
                  <Text style={styles.modalCancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={confirmDateSelection}
                >
                  <Text style={styles.modalConfirmButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={showTimeModal}
          animationType="fade"
          onRequestClose={() => setShowTimeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>시간 선택</Text>
              <DateTimePicker
                value={tempDate}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowTimeModal(false)}
                >
                  <Text style={styles.modalCancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={confirmTimeSelection}
                >
                  <Text style={styles.modalConfirmButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal 
            visible={showMemberModal} 
            transparent 
            animationType="fade"
            onRequestClose={() => setShowMemberModal(false)}
        >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>프로젝트 참여자 선택</Text>
                        <FlatList
                            data={team?.members?.map(member => ({
                                id: member.id,
                                nickname: member.nickname,
                                imageUrl: member.imageUrl || 'default_image_url'
                            })) || []}
                            keyExtractor={(item) => item.id}
                            renderItem={renderTeamMember}
                            contentContainerStyle={{paddingVertical: 10}}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity 
                                onPress={() => setShowMemberModal(false)} 
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={confirmMemberSelection} 
                                style={styles.confirmButton}
                            >
                                <Text style={styles.confirmButtonText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (isSubmitting || !taskTitle.trim()) && styles.submitButtonDisabled
          ]}
          onPress={handleCreateTask}
          disabled={isSubmitting || !taskTitle.trim()}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '생성 중...' : 'Task 추가하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submitButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  submitButton: {
    backgroundColor: '#20B767',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rightButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  icon: {
    marginLeft: 16,
  },
  iconImage: {
    borderRadius: 8,
  },
  selectedIcon: {
    opacity: 1,
  },
  unselectedIcon: {
    opacity: 0.4,
  },
  datePickerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  modalCancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
  },
  teamMemberContainer: {
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 10,
    },
    selectedMemberImage: {
        backgroundColor: '#CCF0DD',
    },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  modalConfirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  inlineDatePicker: {
    width: '100%',
    backgroundColor: 'white',
  },
  dateTimeContainer: {
    gap: 10,
  },
  dateTimeButton: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    },
  memberName: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
  },
  addMemberButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
},
selectedMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
selectedMemberProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
},
addMemberText: {
    color: '#007AFF',
    fontWeight: '600',
},
modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
},
modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
},
cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
},
confirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#20B767',
    borderRadius: 10,
    alignItems: 'center',
},
cancelButtonText: {
    color: '#333',
    fontWeight: '500',
},
confirmButtonText: {
    color: 'white',
    fontWeight: '600',
},
selectedMembersScrollContainer: {
    alignItems: 'center',
    gap: 8,
},
});
