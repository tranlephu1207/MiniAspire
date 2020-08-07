import {default as userReducer} from './reducers/user';
import {default as paymentReducer} from './reducers/payment';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {fetchUserDetail, resetUserDetail, createUser} from './actions/user';
import {createPayment, loadListPayments, loadPayment} from './actions/payment';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

export {
  fetchUserDetail,
  resetUserDetail,
  createUser,
  createPayment,
  loadListPayments,
  loadPayment,
};

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (initialState: RootState | {}) => {
  const middlewares = [thunkMiddleware];
  let enhancer = null;
  if (process.env.NODE_ENV === 'development') {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }
  enhancer = compose(applyMiddleware(...middlewares));
  return createStore(rootReducer, initialState, enhancer);
};

export const store = configureStore({});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
