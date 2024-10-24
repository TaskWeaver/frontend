import {NavigatorScreenParams} from '@react-navigation/native';

export type SignUpParamList = {
  SignUp: undefined;
  Authorization: {email: string; password: string};
  Profile: {email: string; password: string};
  Terms: {email: string; password: string; nickname: string; imageUrl: string};
};

export type MainStackProps = {
  TopBarNavigation: undefined;
  Notification: undefined;
  CreateTeam: undefined;
  ManageTeam: {teamId: string};
};

export type RootStackParamList = {
  OnBoarding: undefined;
  LogIn: undefined;
  SignUpStack: NavigatorScreenParams<SignUpParamList>;
  MainStack: NavigatorScreenParams<MainStackProps>;
};
