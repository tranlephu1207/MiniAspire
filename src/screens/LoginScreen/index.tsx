import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Types, Components} from '../../index';
import auth from '@react-native-firebase/auth';
import * as Global from '../../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.Colors.MAIN_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupBtn: {
    color: Global.Colors.MAIN_GREEN,
    ...Global.TextTheme.body,
  },
  signupContent: {
    color: Global.Colors.WHITE,
    ...Global.TextTheme.body,
  },
  textInput: {
    width: '75%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Global.Colors.WHITE,
    color: Global.Colors.BLACK,
    borderRadius: 5,
    ...Global.TextTheme.body,
  },
  divider: {
    height: 16,
  },
  signinBtn: {
    width: '75%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Global.Colors.MAIN_RED,
  },
  signinText: {
    color: Global.Colors.WHITE,
    textAlign: 'center',
    ...Global.TextTheme.body,
  },
  appNameText: {
    color: Global.Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    ...Global.TextTheme.largeTitle,
  },
});

interface LoginScreenProps {
  route: Types.LoginScreenRouteProp;
  navigation: Types.LoginScreenNavigationProp;
}

const LoginScreen: React.SFC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const login = async (e: string, pwd: string) => {
    if (e === '') {
      Alert.alert('MiniAspire', 'Please input email');
      return;
    }
    if (pwd.length < 6) {
      Alert.alert(
        'MiniAspire',
        'Please input password with at least 6 characters',
      );
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(e, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {loading === true && (
        <Components.LoadingIndicator
          size="large"
          color={Global.Colors.MAIN_GREEN}
        />
      )}
      <Text style={styles.appNameText}>Sign In</Text>
      <View style={styles.divider} />
      <View style={styles.divider} />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.divider} />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.signinBtn}
        onPress={() => login(email, password)}>
        <Text style={styles.signinText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.signupContainer}>
        <Text style={styles.signupContent}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupBtn}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
