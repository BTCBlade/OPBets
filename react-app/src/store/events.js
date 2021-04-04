const LOAD_EVENTS_ALL = 'events/LOAD_EVENTS_ALL';

const EventsAll = (events_data) => {
  return {
    type: LOAD_EVENTS_ALL,
    payload: events_data,
  };
};

export const loadEventsAll = () => async (dispatch) => {
  const res = await fetch('/api/events/all');
  const data = await res.json();

  dispatch(EventsAll(data));
  return data;
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_EVENTS_ALL:
      newState = action.payload;
      return newState;
    default:
      return newState;
  }
};

export default eventsReducer;
