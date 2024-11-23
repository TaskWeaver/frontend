import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import IcLeftArrow from '../../assets/svg/ic_leftArrow.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';
import IcMoreButton from '../../assets/svg/ic_moreButton.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store.ts';

type TeamMemberRouteProp = RouteProp<
  {ManageTeam: {teamId: string}},
  'ManageTeam'
>;

const TeamMember = () => {
  const {navigation} = useCustomNavigation();
  const route = useRoute<TeamMemberRouteProp>();
  const {teamId} = route.params;

  const team = useSelector((state: RootState) =>
    state.team.teams.find((t) => t.id === teamId)
  );

  console.log(team);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <IcLeftArrow size={24} />
        </Pressable>
        <Text style={styles.title}>멤버</Text>
      </View>

      <View style={styles.divider} />

      <View style={{flex: 1, paddingHorizontal: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            팀 멤버({team?.members.length})
          </Text>
          <IcMoreButton color={'black'} style={styles.rotatedIcon} />
        </View>
        <View>
          <Text style={{fontWeight: '600', fontSize: 15}}>팀장</Text>
          <View style={{backgroundColor: '#F0F0F0', borderRadius: 8}}>
            {/*<Image*/}
            {/*  source={*/}
            {/*    imageUrl === 'domain 주소'*/}
            {/*      ? require('../../assets/images/img_user_no_profile.png') // 로컬 이미지*/}
            {/*      : {uri: imageUrl} // 원격 URL*/}
            {/*  }*/}
            {/*  style={{*/}
            {/*    width: 50,*/}
            {/*    height: 50,*/}
            {/*    borderRadius: 25,*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  rotatedIcon: {
    transform: [{rotate: '90deg'}], // 90도 회전
  },
});

export default TeamMember;
