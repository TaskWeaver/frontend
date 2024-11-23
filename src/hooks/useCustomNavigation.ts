import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/types.ts';

export default function useCustomNavigation() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return { navigation };
}
