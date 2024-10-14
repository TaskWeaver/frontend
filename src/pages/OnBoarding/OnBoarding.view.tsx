import React, {useState, useRef} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface OnBoardingViewProps {
  onLogIn: () => void;
}

interface CarouselItem {
  id: string;
  image: any;
  title: string;
  description: string;
}

const {width: screenWidth} = Dimensions.get('window');

const Bullet = ({active}: {active: boolean}) => (
  <View
    style={{
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 8,
      backgroundColor: active ? '#20B767' : '#D9D9D9',
    }}
  />
);

export default function OnBoardingView(props: OnBoardingViewProps) {
  const {onLogIn} = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  const carouselItems: CarouselItem[] = [
    {
      id: '1',
      image: require('../../assets/images/img_onboarding.png'),
      title: '핸드폰으로 하는 프로젝트 관리',
      description:
        '학교에서, 길거리에서, 카페에서 언제든\nTask Weaver에서 프로젝트를 관리해요',
    },
    {
      id: '2',
      image: require('../../assets/images/img_onboarding_2.png'),
      title: '각 태스크의 진행 상황을 수시로 확인',
      description:
        '지금 이 부분을 누가하고 있지? 누가 담당하는지,\n어느정도 진행되었는지 수시로 확인해요',
    },
    {
      id: '3',
      image: require('../../assets/images/img_onboarding_3.png'),
      title: '프로젝트 관리의 처음부터 끝까지',
      description:
        '팀 생성부터 팀원 관리, 프로젝트 관리까지\n모든 과정을 Task Weaver와 함께해주세요',
    },
  ];

  const renderCarouselItem = ({item}: {item: CarouselItem}) => (
    <View style={{width: screenWidth, alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          aspectRatio: 0.9,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 36,
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 32}}>
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 21,
          color: 'gray',
          textAlign: 'center',
          marginVertical: 16,
        }}>
        {item.description}
      </Text>
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={{flexGrow: 1}}>
        <FlatList
          ref={flatListRef}
          data={carouselItems}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
            marginBottom: 20,
          }}>
          {carouselItems.map((_, index) => (
            <Bullet key={index} active={index === activeIndex} />
          ))}
        </View>
        <View style={{paddingHorizontal: 24, marginTop: 32}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#20B767',
              paddingVertical: 15,
              borderRadius: 8,
              marginBottom: 20,
            }}
            onPress={onLogIn}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 16,
              }}>
              Task Weaver 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
