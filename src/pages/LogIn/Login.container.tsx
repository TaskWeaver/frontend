import React, {useState, useEffect} from 'react';
import LoginView from './Login.view';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import useBlockBackButton from '../../hooks/useBlockBackButton.ts';
import DeviceInfo from 'react-native-device-info';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Pressable,
} from 'react-native';

export default function LoginContainer() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const tokenManager = new Token();

    const {navigation} = useCustomNavigation();
    useBlockBackButton();

    // 디바이스 ID 가져오기
    useEffect(() => {
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId);
        });
    }, []);

    // 로그인 처리
    const handleLogin = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            const {result, resultCode} = await service.account.login(
                email,
                password,
                deviceId
            );

            if (resultCode === 200) {
                const {accessToken, refreshToken} = result;
                await tokenManager.saveToken(accessToken, refreshToken);
                setEmail('');
                setPassword('');
                navigation.navigate('MainStack', {screen: 'TopBarNavigation'});
            }
        } catch (error: any) {
            let message = '로그인 중 오류가 발생했습니다.';

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (errorData.reason === '아이디 또는 비밀번호가 일치하지 않습니다.') {
                    message = '아이디 또는 비밀번호를 다시 확인해주세요.';
                } else if (errorData.resultMsg) {
                    message = errorData.resultMsg;
                }
            }

            setErrorMessage(message);
            setIsErrorDialogOpen(true);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleForgotPassword = () => {
        navigation.navigate('MainStack', {screen: 'FindPassword'});
    };

    const handleSignUp = () => {
        navigation.navigate('SignUpStack', {screen: 'SignUp'});
    };

    const handleCloseErrorDialog = () => {
        setIsErrorDialogOpen(false);
        setErrorMessage('');
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#20B767"/>
            </View>
        );
    }

    return (
        <>
            <LoginView
                password={password}
                email={email}
                setPassword={setPassword}
                setEmail={setEmail}
                toggleShowPassword={toggleShowPassword}
                onLogin={handleLogin}
                onForgotPassword={handleForgotPassword}
                onSignUp={handleSignUp}
                showPassword={showPassword}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={isErrorDialogOpen}
                onRequestClose={() => setIsErrorDialogOpen(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorMessage}</Text>
                        <Pressable
                            style={styles.confirmButton}
                            onPress={handleCloseErrorDialog}>
                            <Text style={styles.confirmButtonText}>확인</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 30,
    },
    modalTitle: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 14,
        marginBottom: 3,
        color: 'grey',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#CCF0DD',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 16,
        width: '100%',
    },
    confirmButtonText: {
        color: '#078E47',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});
