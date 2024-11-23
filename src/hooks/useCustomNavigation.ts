import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, SignUpParamList} from '../navigations/types.ts';

export default function useCustomNavigation() {
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList> &
      NativeStackNavigationProp<SignUpParamList>
  >();

  return {navigation};
}
