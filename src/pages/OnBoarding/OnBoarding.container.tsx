import OnBoardingView from './OnBoarding.view.tsx';
import useCustomNavigation from '../../hooks/useCustomNavigation.ts';

export default function OnBoardingContainer() {
  const {navigation} = useCustomNavigation();

  function handleLogIn() {
    navigation.navigate('LogIn');
  }

  return <OnBoardingView onLogIn={handleLogIn} />;
}
