import TermsView from './Terms.view.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SignUpParamList} from '../../navigations/types.ts';
import {service} from '../../domains';
import {useState} from 'react';
import {Portal, Modal as PaperModal} from 'react-native-paper';
import {Pressable, Text} from 'react-native';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

type TermsRouteProps = RouteProp<SignUpParamList, 'Terms'>;

export default function TermsContainer() {
  const route = useRoute<TermsRouteProps>();
  const {email, password, nickname, imageUrl} = route.params;
  const {navigation} = useCustomNavigation();

  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await service.account.createAccount(email, password, nickname, imageUrl);
      navigation.navigate('LogIn');
    } catch (e: any) {
      if (e.response?.status === 409) {
        setModalMessage('이메일이 이미 존재합니다.');
        setModalVisible(true);
      } else {
        setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        setModalVisible(true);
      }
    }
  };

  return (
    <>
      <TermsView
        onSignUp={handleSignUp}
        isTermsAgreed={isTermsAgreed}
        toggleTermsAgreed={() => setIsTermsAgreed(!isTermsAgreed)}
      />
      <Portal>
        <PaperModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 36,
            marginHorizontal: 30,
            borderRadius: 8,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 32}}>
            {modalMessage}
          </Text>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              width: '100%',
              backgroundColor: '#CCF0DD',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#20B767',
                fontSize: 14,
                fontWeight: '700',
              }}>
              확인
            </Text>
          </Pressable>
        </PaperModal>
      </Portal>
    </>
  );
}
