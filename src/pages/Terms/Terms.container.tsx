import TermsView from './Terms.view.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SignUpParamList} from '../../navigations/types.ts';
import {service} from '../../domains';

type TermsRouteProps = RouteProp<SignUpParamList, 'Terms'>;

export default function TermsContainer() {
  const route = useRoute<TermsRouteProps>();

  const {email, password, nickname, imageUrl} = route.params;

  const handleSignUp = async () => {
    await service.account.createAccount(email, password, nickname, imageUrl);
  };

  return <TermsView onSignUp={handleSignUp} />;
}
