import { updateBalance } from './session';

const LOAD_ALL = 'active_wagers/LOAD_ALL';
const CANCEL_ONE = 'active_wagers/CANCEL_ONE';
const loadAll = (active_wagers_arr) => {
  return {
    type: LOAD_ALL,
    payload: active_wagers_arr,
  };
};
const cancelOne = (wagerId) => {
  return {
    type: CANCEL_ONE,
    payload: wagerId,
  };
};

export const cancelOneWager = (wagerId) => async (dispatch) => {
  const res = await fetch(`/api/wagers/cancel/${wagerId}`);
  const data = await res.json();

  dispatch(updateBalance(data.userId));
  dispatch(cancelOne(data.wagerId));
};

export const loadAllActiveWagers = (user_id) => async (dispatch) => {
  const res = await fetch(`/api/users/active_wagers/${user_id}`);
  const data = await res.json();
  dispatch(loadAll(data));
};

const initialState = [];

export default function active_wagersReducer(state = initialState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_ALL:
      newState = action.payload.active_wagers;
      return newState;
    case CANCEL_ONE:
      newState = newState.filter(
        (active_wager) => active_wager.id !== action.payload
      );
      return newState;
    default:
      return state;
  }
}
