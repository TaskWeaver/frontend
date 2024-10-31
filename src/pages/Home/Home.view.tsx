import React, {useLayoutEffect} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {RootState} from '../../app/store';
import {service} from '../../domains';
import Token from '../../domains/storage/Token';
import {setTeams} from '../../features/team/teamSlice';
import {Team} from '../../assets/types/type.ts';

export default function HomeView() {
  const {navigation} = useCustomNavigation();
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.team.teams);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const token = new Token();

  const scaleValue = new Animated.Value(1);

  useLayoutEffect(() => {
    const fetchTeamData = async () => {
      try {
        const accessToken = await token.getAccessToken();

        if (accessToken) {
          const response: any = await service.team.getTeam(accessToken);

          if (Array.isArray(response.data.result)) {
            const teamData: Team[] = response.data.result.map((team: any) => ({
              id: team.id,
              name: team.name,
              description: team.description,
              myRole: team.myRole || '',
              totalMembers: team.totalMembers || 0,
              createdAt: team.createdAt || new Date().toISOString(),
              members: team.members || [],
            }));

            dispatch(setTeams(teamData));
          }
        }
      } catch (error) {
        console.error('Failed to fetch team data:', error);
      }
    };

    fetchTeamData();
  }, [dispatch, token]);

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

  const handleTeamPress = (team: Team) => {
    console.log(team.id);
    navigation.navigate('MainStack', {
      screen: 'ManageTeam',
      params: {teamId: team.id},
    });
  };

  const renderTeamCard = ({item}: {item: Team}) => {
    const teamScaleValue = new Animated.Value(1);

    return (
      <Pressable onPress={() => handleTeamPress(item)}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: '#20B767',
            borderRadius: 12,
            transform: [{scale: teamScaleValue}],
            marginBottom: 8,
            marginTop: 8,
          }}>
          <View style={{padding: 16}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 4,
              }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
              {item.description}
            </Text>
          </View>
          <View style={{height: 2, backgroundColor: 'white'}} />
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              팀 멤버
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
              }}>
              {item.totalMembers} 명
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
        style={{paddingHorizontal: 24}}
        keyExtractor={(item) => item.id.toString()}
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
                  transform: [{scale: scaleValue}],
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
