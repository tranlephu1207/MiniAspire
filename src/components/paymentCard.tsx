import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Global from '..';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Global.Colors.WHITE,
    borderRadius: 15,
    height: 100,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    flex: 1,
    ...Global.ViewTheme.shadowView,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
  },
  leftContainer: {
    height: 100,
    width: 3,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: '60%',
    width: '100%',
    backgroundColor: Global.Colors.MAIN_GREEN,
  },
  centerContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  amountText: {
    color: Global.Colors.BLACK,
    ...Global.TextTheme.title3,
    fontWeight: 'bold',
  },
  dateText: {
    color: Global.Colors.TEXT_GRAY_LIGHT,
    textAlign: 'right',
    ...Global.TextTheme.footNote,
  },
});

interface PaymentCardProps {
  item: Global.ReduxTypes.Payment;
  onPress: any;
}

const PaymentCard: React.SFC<PaymentCardProps> = ({
  item,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.line} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.centerContainer}>
          <Text style={styles.amountText}>{`S$ ${Global.Formats.formatCurrency(
            item.amount,
          )}`}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.dateText}>
            {moment.unix(item.creationTime).format('MMM DD YYYY HH:mm:ss')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;
