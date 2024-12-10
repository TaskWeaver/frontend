import React from 'react';
import {SafeAreaView, View, Text, Pressable, StyleSheet, Image} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IcNotification} from '../../assets/svg';
import dayjs from 'dayjs';

type ManageProjectRouteProp = RouteProp<
    { ManageProject: { projectId: number, name: string, description: string, status: string, createdAt: string } },
    'ManageProject'
>;

export default function ManageProject() {
    const {navigation} = useCustomNavigation();
    const route = useRoute<ManageProjectRouteProp>();
    const {name, status, createdAt} = route.params;

    const handleNotification = () => {
        navigation.navigate('MainStack', {screen: 'Notification'});
    };

    const formattedDate = dayjs(createdAt).format('YYYY.MM.DD');

    const getStatusStyles = () => {
        if (status === 'BEFORE') {
            return {
                backgroundColor: '#FFCACE',
                color: '#FF0000',
                text: '진행 전',
            };
        }
        if (status === 'START') {
            return {
                backgroundColor: '#CCF0DD',
                color: '#20B767',
                text: '진행 중',
            };
        }
        return {backgroundColor: '#E0E0E0', color: '#000', text: '알 수 없음'};
    };

    const statusStyles = getStatusStyles();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 20,
                    paddingBottom: 10,
                    backgroundColor: '#fff',
                }}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{position: 'absolute', left: 16}}>
                    <IcLeftArrow size={24}/>
                </Pressable>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: 15,
                    }}>
                    {name}
                </Text>
                <View style={styles.rightButton}>
                    <Pressable style={styles.icon} onPress={handleNotification}>
                        <IcNotification size={24}/>
                    </Pressable>
                </View>
            </View>

            <View style={{height: 2, backgroundColor: '#FAFAFA', marginBottom: 20}}/>

            <View style={{flex: 1, paddingHorizontal: 24}}>
                <View
                    style={[styles.statusContainer, {backgroundColor: statusStyles.backgroundColor}]}>
                    <Text style={[styles.statusText, {color: statusStyles.color}]}>
                        {statusStyles.text}
                    </Text>
                </View>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{name}의 TimeLine</Text>
                <Text style={{fontSize: 13, fontWeight: '400', marginTop: 4}}>{formattedDate} ~</Text>
                <View style={{marginTop: 80, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/images/img_main_empty.png')}
                           style={{
                               width: 240,
                               height: 260,
                           }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
                        <Text style={{fontSize: 16}}>아직</Text>
                        <Text style={{fontSize: 16, marginLeft: 4, color: '#20B767', fontWeight: '700'}}>{name}팀</Text>
                        <Text style={{fontSize: 16}}>의</Text>
                        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 3}}>Task</Text>
                        <Text style={{fontSize: 16}}>가 없습니다.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                        <Text style={{fontSize: 16, marginRight: 4}}>새로운</Text>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Task</Text>
                        <Text style={{fontSize: 16}}>를 추가해주세요.</Text>
                    </View>
                    <Pressable style={{
                        backgroundColor: '#20B767',
                        borderRadius: 8,
                        width: '100%',
                        padding: 16,
                        marginTop: 200,
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Task
                            추가하기</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    statusContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 8,
        borderRadius: 4,
    },
    statusText: {
        fontWeight: '700',
        fontSize: 12,
    },
});
