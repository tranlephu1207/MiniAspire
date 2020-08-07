import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Global from '..';

/*----- Navigation Props Types -----*/
/* Root */
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  LoginStack: undefined;
  HomeStack: undefined;
  Home: undefined;
  Payment: {
    actionMode?: 'view' | 'create';
    payment?: Global.ReduxTypes.Payment;
    onRefresh?: any;
    nextId?: number;
  };
};

/* Login Screen */
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
/*-----------------------------*/

/* Home Stack */
/* Home Screen */
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

/* Payment Screen */
export type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
export type PaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
/*-----------------------------*/
