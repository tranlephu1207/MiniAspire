import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItem,
  Alert,
} from 'react-native';
import * as Global from '../../index';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchUserDetail,
  resetUserDetail,
  loadListPayments,
  AppDispatch,
} from '../../redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.Colors.MAIN_BLUE,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
  bigText: {
    color: Global.Colors.WHITE,
    paddingHorizontal: 16,
    ...Global.TextTheme.title2,
  },
  smallText: {
    color: Global.Colors.WHITE,
    paddingTop: 5,
    paddingHorizontal: 16,
    ...Global.TextTheme.caption1,
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
    top: 30,
    backgroundColor: Global.Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  balanceContainer: {
    backgroundColor: Global.Colors.WHITE,
    borderRadius: 15,
    height: 150,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    ...Global.ViewTheme.shadowView,
  },
  accountBalanceText: {
    color: Global.Colors.BLACK,
    ...Global.TextTheme.body,
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
  amountText: {
    color: Global.Colors.BLACK,
    paddingHorizontal: 10,
    flex: 1,
    ...Global.TextTheme.largeTitle,
  },
  accountBalanceChildContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paymentsContainer: {
    paddingTop: 16,
    flex: 1,
  },
  paymentsContentContainer: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingTop: 5,
  },
  divider: {
    height: 16,
  },
  cardContainer: {
    backgroundColor: Global.Colors.MAIN_BLUE,
    borderRadius: 15,
    height: 150,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    ...Global.ViewTheme.shadowView,
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '25%',
  },
  draftEmptyImage: {
    width: 150,
    height: 150,
  },
  emptyDataText: {
    color: Global.Colors.BLACK,
    marginTop: 10,
    textAlign: 'center',
    ...Global.TextTheme.title3,
  },
});

interface HomeState {
  user: Global.ReduxTypes.UserState;
  payment: Global.ReduxTypes.PaymentState;
}

const mapState = (state: HomeState) => ({
  userDetail: state.user.user,
  listPayments: state.payment.listPayments,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  actions: bindActionCreators(
    {
      fetchUserDetail,
      resetUserDetail,
      loadListPayments,
    },
    dispatch,
  ),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeScreenProps = PropsFromRedux & {
  route: Global.Types.HomeScreenRouteProp;
  navigation: Global.Types.HomeScreenNavigationProp;
};

const HomeScreen: React.SFC<HomeScreenProps> = ({
  userDetail,
  listPayments,
  navigation,
  actions,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const fullName = React.useMemo(() => {
    if (userDetail) {
      return userDetail.name || '';
    }
    return '';
  }, [userDetail]);

  const loanAmount = React.useMemo(() => {
    if (userDetail) {
      return userDetail.amount || 0;
    }
    return 0;
  }, [userDetail]);

  const fetchListPayments = async (uid: string) => {
    try {
      await actions.loadListPayments(uid);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', error.message);
    }
  };

  const onRefresh = () => {
    if (userDetail) {
      fetchListPayments(userDetail!.uid);
    }
  };

  React.useEffect(() => {
    if (userDetail) {
      fetchListPayments(userDetail!.uid);
    }
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await auth()
        .signOut()
        .then(async () => {
          await actions.resetUserDetail();
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', "Can't not log out!");
    }
  };

  const onPressCard = (payment: Global.ReduxTypes.Payment) => {
    navigation.navigate('Payment', {
      actionMode: 'view',
      payment: payment,
    });
  };

  const handleLogout = () => {
    Alert.alert('MiniAspire', 'Do you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const renderItem: ListRenderItem<Global.ReduxTypes.Payment> = ({
    item,
  }: {
    item: Global.ReduxTypes.Payment;
    index: Number;
  }) => {
    return (
      <Global.Components.PaymentCard
        item={item}
        onPress={() => onPressCard(item)}
      />
    );
  };

  const renderSeparator = ({
    leadingItem,
    section,
  }: {
    leadingItem: any;
    section: any;
  }) => {
    return <View style={styles.divider} />;
  };

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDataContainer}>
        <Image
          style={styles.draftEmptyImage}
          source={Global.Images.draftEmptyImage}
        />
        <Text style={styles.emptyDataText}>You don't have any payment yet</Text>
      </View>
    );
  };

  const renderPayments = () => {
    return (
      <View style={styles.paymentsContainer}>
        <FlatList<Global.ReduxTypes.Payment>
          contentContainerStyle={styles.paymentsContentContainer}
          data={listPayments}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={({id}) => `${id}`}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyData}
          scrollEnabled={listPayments.length > 0}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            onRefresh();
            setRefreshing(false);
          }}
        />
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
      <View style={styles.header}>
        <Icon
          name="sign-out"
          size={24}
          onPress={handleLogout}
          color={Global.Colors.WHITE}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.bigText}>{`Welcome ${fullName}`}</Text>
        <Text style={styles.smallText}>
          What would you like to get done today?
        </Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataBackgroundContainer} />
          <View style={styles.balanceContainer}>
            <Text style={styles.accountBalanceText}>Account Balance</Text>
            <View style={styles.accountBalanceChildContainer}>
              <View style={styles.currencyContainer}>
                <Text style={styles.currencyText}>S$</Text>
              </View>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.amountText}>
                {Global.Formats.formatCurrency(loanAmount)}
              </Text>
            </View>
          </View>
          {renderPayments()}
        </View>
      </View>

      <Global.Components.CircleButton
        onPress={() =>
          navigation.navigate('Payment', {
            actionMode: 'create',
            onRefresh: onRefresh,
            nextId: listPayments.length + 1,
          })
        }
      />
    </View>
  );
};

export default connector(HomeScreen);
