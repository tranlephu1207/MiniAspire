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
import * as Global from '../../index';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppDispatch, createUser} from '../../redux';

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

const mapDispatch = (dispatch: AppDispatch) => ({
  actions: bindActionCreators(
    {
      createUser,
    },
    dispatch,
  ),
});

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SignupScreenProps = PropsFromRedux & {
  route: Types.LoginScreenRouteProp;
  navigation: Types.LoginScreenNavigationProp;
};

const SignupScreen: React.SFC<SignupScreenProps> = ({navigation, actions}) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [loanTerm, setLoanTerm] = React.useState('12');

  const weeklyPayment = React.useMemo(() => {
    const amountNumber = amount ? Number(amount) : null;
    const loanTermNumber = loanTerm ? Number(loanTerm) : null;
    if (amountNumber && loanTermNumber) {
      return amountNumber / loanTermNumber;
    }
    return 0;
  }, [amount, loanTerm]);

  const signup = async () => {
    if (email === '') {
      Alert.alert('Warning', 'Please input email');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Warning',
        'Please input password with at least 6 characters',
      );
      return;
    }
    if (name === '') {
      Alert.alert('Warning', 'Please input name');
      return;
    }
    const amountNumber = amount ? Number(amount) : null;
    if (amountNumber !== null && amountNumber <= 0) {
      Alert.alert('Warning', 'Please input loan amount');
      return;
    }
    const loanTermNumber = loanTerm ? Number(loanTerm) : null;
    if (loanTermNumber !== null && loanTermNumber <= 0) {
      Alert.alert('Warning', 'Please input loan term (weeks) bigger than 0');
      return;
    }
    if (weeklyPayment <= 0) {
      Alert.alert('Warning', 'Weekly payment must bigger than 0');
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      await actions.createUser(
        email,
        password,
        name,
        amountNumber!,
        loanTermNumber!,
        weeklyPayment,
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      }
    }
  };

  return (
    <Components.DismissKeyboard>
      <View style={styles.container}>
        {loading === true && (
          <Components.LoadingIndicator
            size="large"
            color={Global.Colors.MAIN_GREEN}
          />
        )}
        <Text style={styles.appNameText}>Create an Account?</Text>
        <View style={styles.divider} />
        <View style={styles.divider} />
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.textInput}
          placeholder="Loan Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="number-pad"
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.textInput}
          placeholder="Loan Term (Weeks)"
          value={loanTerm}
          onChangeText={setLoanTerm}
          keyboardType="number-pad"
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.textInput}
          placeholder="Loan Term (Weeks)"
          value={`S$ ${Global.Formats.formatCurrency(weeklyPayment)}`}
          keyboardType="number-pad"
          editable={false}
        />
        <View style={styles.divider} />
        <View style={styles.divider} />
        <TouchableOpacity style={styles.signinBtn} onPress={signup}>
          <Text style={styles.signinText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupContent}>Don't a member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupBtn}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Components.DismissKeyboard>
  );
};

export default connector(SignupScreen);
