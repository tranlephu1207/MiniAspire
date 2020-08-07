import {
  FETCH_USER_DETAIL,
  RESET_USER_DETAIL,
  CREATE_USER,
} from '../constants/eventActionTypes';
import {User} from '../constants/types';
import {AppThunk} from '../';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const fetchUserDetail = (user: User): AppThunk => async (dispatch) => {
  await dispatch({
    type: FETCH_USER_DETAIL,
    payload: user,
  });
};

export const resetUserDetail = (): AppThunk => async (dispatch) => {
  await dispatch({
    type: RESET_USER_DETAIL,
  });
};

export const createUser = (
  email: string,
  password: string,
  name: string,
  amount: number,
  loanTerm: number,
  weeklyPayment: number,
): AppThunk => async (dispatch) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (creds) => {
      const uid = creds.user.uid;
      const newUser = {
        uid: uid,
        name: name,
        email: email,
        amount: amount,
        creationTime: moment().unix(),
        weeklyPayment: weeklyPayment,
        loanTerm: loanTerm,
        paidWeeks: 0,
      };
      await firestore()
        .collection('Users')
        .doc(`${uid}`)
        .set(newUser)
        .then(async () => {
          await dispatch({
            type: CREATE_USER,
            payload: newUser,
          });
        })
        .catch((writeError: any) => {
          throw writeError;
        });
    })
    .catch((error: any) => {
      throw error;
    });
};
