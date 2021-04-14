import { login, authenticate, demoLogin } from '../services/auth';

const LOGIN = 'session/LOGIN';
const UPDATE_BALANCE = 'session/UPDATE_BALANCE';

const loginAction = (user) => ({
  type: LOGIN,
  user,
});
const update_balance = (balance) => ({
  type: UPDATE_BALANCE,
  payload: balance,
});

export const loginUser = ({ email, password }) => async (dispatch) => {
  const user = await login(email, password);
  if (user) {
    // console.log(user);
    const loggedInUser = user;
    await dispatch(loginAction(loggedInUser));
    return loggedInUser;
  }
};

export const demoLoginUser = () => async (dispatch) => {
  const user = await login('demo@aa.io', 'password');
  if (user) {
    const loggedInUser = user;
    await dispatch(loginAction(loggedInUser));
    return loggedInUser;
  }
};

export const restoreUser = () => async (dispatch) => {
  const user = await authenticate();
  await dispatch(loginAction(user));
  return user;
};

export const updateBalance = (user_id) => async (dispatch) => {
  const res = await fetch(`/api/users/${user_id}`);
  const data = await res.json();

  dispatch(update_balance(data.balance));
  return data.balance;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const newState = {};
      newState.username = action.user.username;
      newState.balance = action.user.balance;
      newState.email = action.user.email;
      newState.id = action.user.id;
      return newState;
    }
    case UPDATE_BALANCE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.balance = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
