import {
  CREATE_PAYMENT,
  LOAD_PAYMENT,
  LOAD_LIST_PAYMENTS,
} from '../constants/eventActionTypes';
import {PaymentActionTypes, PaymentState} from '../constants/types';

const initialState: PaymentState = {
  payment: null,
  listPayments: [],
};

export default (state = initialState, action: PaymentActionTypes) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_PAYMENT:
    case CREATE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case LOAD_LIST_PAYMENTS:
      return {
        ...state,
        listPayments: payload,
      };
    default:
      return state;
  }
};
