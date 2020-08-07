import {
  CREATE_PAYMENT,
  LOAD_PAYMENT,
  LOAD_LIST_PAYMENTS,
} from '../constants/eventActionTypes';
import {Payment} from '../constants/types';
import {AppThunk} from '../';
import firestore from '@react-native-firebase/firestore';

export const createPayment = (payment: Payment): AppThunk => async (
  dispatch,
) => {
  await firestore()
    .collection('Payments')
    .doc(`${payment.id}`)
    .set(payment)
    .then(async () => {
      await dispatch({
        type: CREATE_PAYMENT,
        payload: payment,
      });
    })
    .catch((writeError: any) => {
      throw writeError;
    });
};

export const loadPayment = (
  userUid: string,
  paymentId: number,
): AppThunk => async (dispatch) => {
  await firestore()
    .collection('Payments')
    .where('userUid', '==', userUid)
    .where('id', '==', paymentId)
    .get()
    .then(async (querySnapshot) => {
      await dispatch({
        type: LOAD_PAYMENT,
        payload: null,
      });
    })
    .catch((error) => {
      throw error;
    });
};

export const loadListPayments = (userUid: string): AppThunk => async (
  dispatch,
) => {
  await firestore()
    .collection('Payments')
    .where('userUid', '==', userUid)
    .get()
    .then(async (querySnapshot) => {
      const lists: Array<Payment> = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Payment;
        const payment: Payment = {...data};
        lists.push(payment);
      });
      await dispatch({
        type: LOAD_LIST_PAYMENTS,
        payload: lists,
      });
    })
    .catch((error) => {
      throw error;
    });
};
