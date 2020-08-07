import {
  FETCH_USER_DETAIL,
  RESET_USER_DETAIL,
  CREATE_USER,
  CREATE_PAYMENT,
  LOAD_PAYMENT,
  LOAD_LIST_PAYMENTS,
} from './eventActionTypes';

// User Record
export interface User {
  uid: string;
  name: string;
  email: string;
  amount: number;
  creationTime: number;
  loanTerm: number;
  weeklyPayment: number;
  paidWeeks: number;
}

interface fetchUserDetailAction {
  type: typeof FETCH_USER_DETAIL;
  payload: User | null;
}

interface resetUserDetailAction {
  type: typeof RESET_USER_DETAIL;
  payload?: User | null;
}

interface createUserAction {
  type: typeof CREATE_USER;
  payload: User;
}

export type UserActionTypes =
  | fetchUserDetailAction
  | resetUserDetailAction
  | createUserAction;

export interface UserState {
  user: User | null;
}

// Payment Record
export interface Payment {
  userUid: string;
  amount: number;
  creationTime: number;
  week: number;
  newBalance: number;
  oldBalance: number;
  id: number;
}

interface createPayment {
  type: typeof CREATE_PAYMENT;
  payload: Payment;
}

interface loadPayment {
  type: typeof LOAD_PAYMENT;
  payload: Payment | null;
}

interface loadListPayments {
  type: typeof LOAD_LIST_PAYMENTS;
  payload: Array<Payment>;
}

export type PaymentActionTypes = createPayment | loadPayment | loadListPayments;

export interface PaymentState {
  payment: Payment | null;
  listPayments: Array<Payment>;
}
