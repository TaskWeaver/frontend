import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import React from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

export default function CreateProject() {

    const {navigation} = useCustomNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <IcLeftArrow size={24} />
                </Pressable>
                <Text style={styles.title}>프로젝트 추가</Text>
            </View>

            <View style={styles.divider} />

            <View style={{ flex: 1, paddingHorizontal: 24 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18}}>프로젝트 제목</Text>
                    <TextInput placeholder={'프로젝트 제목을 입력해주세요'} style={{ fontSize: 16, marginTop: 2, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA'}} />
                </View>
                <View style={{ marginTop: 36 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18}}>프로젝트 담당자 및 참여자</Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 30,
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    divider: {
        height: 2,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
    },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    createButton: {
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 50,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
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
    modalText: {
        fontSize: 14,
        marginBottom: 3,
        textAlign: 'center',
        fontWeight: 'bold',
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
});
