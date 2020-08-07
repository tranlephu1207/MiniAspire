import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Types} from '../../index';
import * as Global from '../../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createPayment, AppDispatch} from '../../redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.Colors.MAIN_BLUE,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
  contentContentContainer: {
    flexGrow: 1,
  },
  bigText: {
    color: Global.Colors.WHITE,
    textAlign: 'center',
    marginTop: 16,
    ...Global.TextTheme.title2,
  },
  dataContainer: {
    flex: 1,
    marginTop: 30,
  },
  dataBackgroundContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '35%',
    backgroundColor: Global.Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //
  paymentLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  paymentContainer: {
    backgroundColor: Global.Colors.WHITE,
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 15,
    paddingVertical: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    ...Global.ViewTheme.shadowView,
  },
  currencyContainer: {
    borderRadius: 5,
    backgroundColor: Global.Colors.MAIN_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    color: Global.Colors.WHITE,
    ...Global.TextTheme.caption1,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  amountText: {
    color: Global.Colors.BLACK,
    paddingHorizontal: 10,
    ...Global.TextTheme.headline,
  },
  accountBalanceChildContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  amountTitle: {
    color: Global.Colors.TEXT_GRAY,
    marginBottom: 10,
    ...Global.TextTheme.body,
  },
  idTitle: {
    color: Global.Colors.TEXT_GRAY_LIGHT,
    textAlign: 'center',
    ...Global.TextTheme.subHead,
  },
  semiCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of the image width
    backgroundColor: 'blue',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#f5f5f5',
    ...Global.ViewTheme.shadowView,
  },
  bottomPaymentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    paddingLeft: 10,
    color: Global.Colors.BLACK,
    ...Global.TextTheme.subHead,
  },
  answerText: {
    color: Global.Colors.TEXT_GRAY_LIGHT,
    marginTop: 10,
    textAlign: 'center',
    ...Global.TextTheme.subHead,
  },
  divider: {
    height: 16,
  },
  proceedBtn: {
    backgroundColor: Global.Colors.MAIN_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  proceedTxt: {
    color: Global.Colors.WHITE,
    textAlign: 'center',
    ...Global.TextTheme.body,
  },
});

interface PaymenScreenState {
  user: Global.ReduxTypes.UserState;
  payment: Global.ReduxTypes.PaymentState;
}

const mapState = (state: PaymenScreenState) => ({
  userDetail: state.user.user,
  payment: state.payment.payment,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  actions: bindActionCreators(
    {
      createPayment,
    },
    dispatch,
  ),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PaymentScreenProps = PropsFromRedux & {
  route: Types.PaymentScreenRouteProp;
  navigation: Types.PaymentScreenNavigationProp;
};

const PaymentScreen: React.SFC<PaymentScreenProps> = ({
  userDetail,
  navigation,
  route,
  actions,
}) => {
  const {actionMode = 'create'} = route.params;
  const {payment = null} = route.params;
  const {onRefresh = () => {}} = route.params;
  const {nextId = 0} = route.params;
  const [loading, setLoading] = React.useState(false);
  const week = React.useMemo(() => {
    if (payment && actionMode === 'view') {
      return payment.week;
    } else {
      return nextId;
    }
  }, [payment, actionMode, nextId]);

  const creationTime = React.useMemo(() => {
    if (payment && actionMode === 'view') {
      return moment.unix(payment.creationTime).format('MMM DD, YYYY - HH:mm');
    } else {
      return moment().format('MMM DD, YYYY - HH:mm');
    }
  }, [payment, actionMode]);

  const title = React.useMemo(() => {
    if (payment && actionMode === 'view') {
      return 'Payment Detail';
    } else {
      return 'Make a Payment?';
    }
  }, [payment, actionMode]);

  const paymentAmount = React.useMemo(() => {
    if (payment && actionMode === 'view') {
      return Global.Formats.formatCurrency(payment!.amount);
    } else {
      return Global.Formats.formatCurrency(userDetail?.weeklyPayment || 0);
    }
  }, [payment, actionMode, userDetail]);

  const onPressCancel = () => {
    if (actionMode === 'create') {
      Alert.alert('MiniAspire', 'Do you want to cancel payment?', [
        {text: 'No, continue', style: 'cancel'},
        {text: 'Yes', onPress: () => navigation.goBack()},
      ]);
    } else {
      navigation.goBack();
    }
  };

  const onPressProceed = async () => {
    setLoading(true);
    try {
      const newPayment: Global.ReduxTypes.Payment = {
        userUid: userDetail!.uid,
        amount: userDetail!.weeklyPayment,
        creationTime: moment().unix(),
        week,
        newBalance: userDetail!.amount - userDetail!.weeklyPayment,
        oldBalance: userDetail!.amount,
        id: nextId,
      };
      await actions.createPayment(newPayment);
      setLoading(false);
      onRefresh();
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const renderTopPaymentView = () => {
    return (
      <View>
        <Text style={styles.idTitle}>{`ID: #${0}`}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountTitle}>Weekly Payment Amount</Text>
          <View style={styles.accountBalanceChildContainer}>
            <View style={styles.currencyContainer}>
              <Text style={styles.currencyText}>S$</Text>
            </View>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.amountText}>
              {paymentAmount}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBottomPaymentView = () => {
    return (
      <View style={styles.bottomPaymentContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleView}>
            <Icon name="shopping-cart" size={20} color={Global.Colors.BLACK} />
            <Text style={styles.titleText}>Week #</Text>
          </View>
          <Text style={styles.answerText}>{week}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.titleContainer}>
          <View style={styles.titleView}>
            <Icon name="calendar" size={20} color={Global.Colors.BLACK} />
            <Text style={styles.titleText}>Payment Date</Text>
          </View>
          <Text style={styles.answerText}>{creationTime}</Text>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading === true && (
        <Global.Components.LoadingIndicator
          size="large"
          color={Global.Colors.MAIN_GREEN}
        />
      )}
      <SafeAreaView />
      <View style={styles.dataBackgroundContainer} />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressCancel}>
          <Icon name="times" size={28} color={Global.Colors.WHITE} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.contentContentContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.paymentLogo}
            source={Global.Images.paymentLogo}
          />
          <Text style={styles.bigText}>{title}</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.paymentContainer}>
            <View>
              {renderTopPaymentView()}
              {renderBottomPaymentView()}
              <View style={styles.divider} />
            </View>
            {actionMode === 'create' && (
              <TouchableOpacity
                onPress={onPressProceed}
                style={styles.proceedBtn}>
                <Text style={styles.proceedTxt}>Proceed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default connector(PaymentScreen);
