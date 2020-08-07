import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignupScreen, HomeScreen, PaymentScreen} from '../screens';
import * as Global from '../index';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserDetail, resetUserDetail, AppDispatch} from '../redux';

const Stack = createStackNavigator<Global.Types.RootStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{headerShown: false}}
        initialParams={{actionMode: 'create'}}
      />
    </Stack.Navigator>
  );
};

interface MainSwitchNavigatorState {
  user: Global.ReduxTypes.UserState;
  payment: Global.ReduxTypes.PaymentState;
}

const mapState = (state: MainSwitchNavigatorState) => ({
  userDetail: state.user.user,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  actions: bindActionCreators(
    {
      fetchUserDetail,
      resetUserDetail,
    },
    dispatch,
  ),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MainSwitchNavigatorProps = PropsFromRedux & {};

const MainSwitchNavigator: React.SFC<MainSwitchNavigatorProps> = ({
  actions,
}) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const isLoggedIn = useSelector(
    (state: MainSwitchNavigatorState) => state.user.user !== null,
  );

  React.useEffect(() => {
    const monitorUserState = async () => {
      auth().onAuthStateChanged(async (userState) => {
        if (userState) {
          await firestore()
            .collection('Users')
            .doc(`${userState.uid}`)
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                const data = documentSnapshot.data();
                const detail: Global.ReduxTypes.User | null =
                  data === undefined
                    ? null
                    : {
                        uid: data.uid,
                        name: data.name,
                        email: data.email,
                        creationTime: data.creationTime,
                        amount: data.amount,
                        loanTerm: data.loanTerm,
                        weeklyPayment: data.weeklyPayment,
                        paidWeeks: data.paidWeeks,
                      };
                if (detail) {
                  actions.fetchUserDetail(detail);
                }
              }
            });
        }
        setUser(userState);
      });
    };
    monitorUserState();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="LoginStack" component={LoginStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connector(MainSwitchNavigator);
