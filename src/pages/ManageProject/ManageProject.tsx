import {SafeAreaView, View, Text, Pressable, StyleSheet, Image} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import React from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IcNotification} from '../../assets/svg';

type ManageProjectRouteProp = RouteProp<
    { ManageProject: { projectId: number, name: string, description: string } },
    'ManageProject'
>;

export default function ManageProject() {
    const {navigation} = useCustomNavigation();

    const route = useRoute<ManageProjectRouteProp>();
    const {name} = route.params;

    const handleNotification = () => {
        navigation.navigate('MainStack', {screen: 'Notification'});
    };

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
                    position: 'relative',
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

            <View style={{paddingHorizontal: 24}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{name}의 TimeLine</Text>
                <View style={{marginTop: 80, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/images/img_main_empty.png')}
                           style={{
                               width: 240,
                               height: 260,
                           }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
                        <Text style={{fontSize: 16}}>아직</Text>
                        <Text style={{fontSize: 16, marginLeft: 4, color: '#20B767', fontWeight: '700'}}>{name} 팀</Text>
                        <Text style={{fontSize: 16}}>의</Text>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Task</Text>
                        <Text style={{fontSize: 16}}>가 없습니다.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, marginRight: 4}}>새로운</Text>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>Task</Text>
                        <Text style={{fontSize: 16}}>를 추가해주세요.</Text>


                    </View>
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
});
