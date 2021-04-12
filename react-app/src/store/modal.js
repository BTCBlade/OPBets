const MODAL_OPEN_LOGIN = 'loginModal/open';
const MODAL_CLOSE_LOGIN = 'loginModal/close';
const MODAL_OPEN_SIGNUP = 'signupModal/open';
const MODAL_CLOSE_SIGNUP = 'signupModal/close';
const MODAL_OPEN_WAGER_MATCHING_PROGRESS = 'wager_matching_progress_modal/open';
const MODAL_CLOSE_WAGER_MATCHING_PROGRESS =
  'wager_matching_progress_modal/close';

export const openLogin = () => {
  return {
    type: MODAL_OPEN_LOGIN,
  };
};

export const closeLogin = () => {
  return {
    type: MODAL_CLOSE_LOGIN,
  };
};

export const openSignup = () => {
  return {
    type: MODAL_OPEN_SIGNUP,
  };
};

export const closeSignup = () => {
  return {
    type: MODAL_CLOSE_SIGNUP,
  };
};

export const openWagerMatchingProgress = () => {
  return {
    type: MODAL_OPEN_WAGER_MATCHING_PROGRESS,
  };
};

export const closeWagerMatchingProgress = () => {
  return {
    type: MODAL_CLOSE_WAGER_MATCHING_PROGRESS,
  };
};

const initialState = {
  loginShow: false,
  signupShow: false,
  wager_matching_progress_Show: false,
};

const modalReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case MODAL_OPEN_LOGIN:
      newState = Object.assign({}, state, { loginShow: true });
      return newState;
    case MODAL_CLOSE_LOGIN:
      newState = Object.assign({}, state, { loginShow: false });
      return newState;
    case MODAL_OPEN_SIGNUP:
      newState = Object.assign({}, state, { signupShow: true });
      return newState;
    case MODAL_CLOSE_SIGNUP:
      newState = Object.assign({}, state, { signupShow: false });
      return newState;
    case MODAL_OPEN_WAGER_MATCHING_PROGRESS:
      newState = Object.assign({}, state, {
        wager_matching_progress_Show: true,
      });
      return newState;
    case MODAL_CLOSE_WAGER_MATCHING_PROGRESS:
      newState = Object.assign({}, state, {
        wager_matching_progress_Show: false,
      });
      return newState;
    default:
      return state;
  }
};

export default modalReducer;
