const LOAD_ALL = 'active_wagers/LOAD_ALL';

const loadAll = (active_wagers_arr) => {
  return {
    type: LOAD_ALL,
    payload: active_wagers_arr,
  };
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
    default:
      return state;
  }
}
