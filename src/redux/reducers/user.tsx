import {
  FETCH_USER_DETAIL,
  RESET_USER_DETAIL,
  CREATE_USER,
} from '../constants/eventActionTypes';
import {UserActionTypes, UserState} from '../constants/types';

const initialState: UserState = {
  user: null,
};

export default (state = initialState, action: UserActionTypes) => {
  const {type, payload} = action;
  switch (type) {
    case CREATE_USER:
    case FETCH_USER_DETAIL:
      return {
        ...state,
        user: payload,
      };
    case RESET_USER_DETAIL:
      return initialState;
    default:
      return state;
  }
};
