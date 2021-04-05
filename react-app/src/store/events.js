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

  dispatch(EventsAll(data['events_all']));
  return data;
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_EVENTS_ALL:
      newState = {};
      action.payload.forEach((event) => {
        newState[event.time] = {
          betsapi_id: event['betsapi_id'],
          bet365_id: event['bet365_id'],
          id: event['id'],
          home: JSON.parse(event['home']),
          away: JSON.parse(event['away']),
          league: JSON.parse(event['league']),
          predictions: event['predictions'],
          sport_id: event['sports_id'],
          time: event['time'],
          time_status: event['time_status'],
        };
      });
      return newState;
    default:
      return newState;
  }
};

export default eventsReducer;
