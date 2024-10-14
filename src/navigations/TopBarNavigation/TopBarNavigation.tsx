import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../../pages/Home';
import {Image, Pressable, View, Animated} from 'react-native';
import {IcNotification, IcPlus} from '../../assets/svg';
import React, {useRef, useState, useEffect} from 'react';
import Todo from '../../pages/Todo/Todo.container.tsx';
import TabBar from '../../components/TabBar/TabBar.tsx';
import MyPage from '../../pages/MyPage/MyPage.container.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = () => {
  const {navigation} = useCustomNavigation();
  const [isMyPageActive, setIsMyPageActive] = useState(false);

  // 애니메이션 값 선언
  const scaleValuePlus = useRef(new Animated.Value(1)).current;
  const scaleValueNotification = useRef(new Animated.Value(1)).current;

  // 애니메이션 함수
  const handlePressIn = (scaleValue: Animated.Value) => {
    Animated.spring(scaleValue, {
      toValue: 0.7, // 버튼을 살짝 줄임
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleValue: Animated.Value) => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleCreateTeam = () => {
    navigation.navigate('MainStack', {screen: 'CreateTeam'});
  };

  return (
    <>
      <View
        style={{
          paddingTop: 80,
          paddingBottom: 20,
          paddingHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}>
        <Image
          source={require('../../assets/images/img_logo.png')}
          style={{width: 35, height: 20}}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row', gap: 13}}>
          {!isMyPageActive && (
            <Pressable
              onPressIn={() => handlePressIn(scaleValuePlus)}
              onPressOut={() => handlePressOut(scaleValuePlus)}
              onPress={handleCreateTeam}>
              <Animated.View style={{transform: [{scale: scaleValuePlus}]}}>
                <IcPlus size={24} />
              </Animated.View>
            </Pressable>
          )}

          <Pressable
            onPressIn={() => handlePressIn(scaleValueNotification)}
            onPressOut={() => handlePressOut(scaleValueNotification)}
            onPress={() =>
              navigation.navigate('MainStack', {screen: 'Notification'})
            }>
            <Animated.View
              style={{transform: [{scale: scaleValueNotification}]}}>
              <IcNotification size={24} />
            </Animated.View>
          </Pressable>
        </View>
      </View>
      <Tab.Navigator
        tabBar={(props) => {
          const activeRoute = props.state.routeNames[props.state.index];
          useEffect(() => {
            setIsMyPageActive(activeRoute === 'MyPage');
          }, [activeRoute]);

          return <TabBar {...props} />;
        }}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{tabBarLabel: '보드'}}
        />
        <Tab.Screen
          name="Todo"
          component={Todo}
          options={{tabBarLabel: '투두'}}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{tabBarLabel: '마이'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopBarNavigation;
