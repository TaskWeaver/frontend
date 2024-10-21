import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store.ts';
import {Team} from '../../features/team/type.ts';

export default function HomeView() {
  const {navigation} = useCustomNavigation();
  const teams = useSelector((state: RootState) => state.team.teams);

  // 애니메이션 값 선언
  const scaleValue = new Animated.Value(1); // useRef 대신 애니메이션 값을 선언

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigate = () => {
    navigation.navigate('MainStack', {screen: 'CreateTeam'});
  };

  // 팀 카드 터치 시 네비게이션 함수
  const handleTeamPress = (team: Team) => {
    navigation.navigate('MainStack', {
      screen: 'ManageTeam',
      params: {teamId: team.id},
    });
  };

  // renderItem 함수 내부에서 애니메이션 값을 외부에서 직접 받아서 처리
  const renderTeamCard = ({item}: {item: Team}) => {
    const teamScaleValue = new Animated.Value(1); // 컴포넌트 외부에서 직접 애니메이션 값 선언

    const handleTeamPressIn = () => {
      Animated.spring(teamScaleValue, {
        toValue: 0.95, // 작아지는 크기
        useNativeDriver: true,
      }).start();
    };

    const handleTeamPressOut = () => {
      Animated.spring(teamScaleValue, {
        toValue: 1, // 원래 크기로 복귀
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Pressable
        onPressIn={handleTeamPressIn}
        onPressOut={handleTeamPressOut}
        onPress={() => handleTeamPress(item)}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: '#20B767',
            borderRadius: 12,
            transform: [{scale: teamScaleValue}], // 애니메이션 값 적용
          }}>
          <View
            style={{
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 4,
              }}>
              {item.name}
            </Text>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'medium'}}>
              {item.description}
            </Text>
          </View>
          <View style={{height: 2, backgroundColor: 'white'}} />
          <View style={{padding: 16}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              팀 멤버
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={teams}
        style={{paddingHorizontal: 24, marginTop: 24}}
        keyExtractor={(item) => item.name}
        renderItem={renderTeamCard}
        ListEmptyComponent={
          <View
            style={{
              paddingTop: 60,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              source={require('../../assets/images/img_main_empty.png')}
              style={{width: 223, height: 234}}
            />
            <Text
              style={{
                color: '#20B767',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              환영합니다
            </Text>
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: '600'}}>
              {'팀을 만들고 팀원들과\n프로젝트 관리를 시작해주세요'}
            </Text>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleNavigate}
              style={{marginTop: 150, width: '100%'}}>
              <Animated.View
                style={{
                  transform: [{scale: scaleValue}], // 애니메이션 값 적용
                  backgroundColor: '#20B767',
                  paddingVertical: 16,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  팀 생성하기
                </Text>
              </Animated.View>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}
