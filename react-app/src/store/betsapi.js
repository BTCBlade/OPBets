const LOAD_DATA = 'betsapi/LOAD_DATA';

const loadData = (data) => {
  return {
    type: LOAD_DATA,
    payload: data,
  };
};

export const testLoad = () => async (dispatch) => {
  const res = await fetch('/api/betsapi/req_seeder');
  const data = await res.json();

  dispatch(loadData(data));
  console.log(data);
  return data;
};

const initialState = {};

const betsapiReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_DATA: {
      newState = action.payload;
      return newState;
    }
    default:
      return newState;
  }
};

export default betsapiReducer;
