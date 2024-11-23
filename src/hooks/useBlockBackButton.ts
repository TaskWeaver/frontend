import {useEffect} from 'react';
import {BackHandler} from 'react-native';

function useBlockBackButton() {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      }
    );
    return () => subscription.remove();
  }, []);
}

export default useBlockBackButton;
