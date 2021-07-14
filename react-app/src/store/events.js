const LOAD_EVENTS_ALL = 'events/LOAD_EVENTS_ALL';
const LOAD_AA_EVENTS_ALL = 'events/LOAD_AA_EVENTS_ALL';
const SPECIFIC_EVENTS = 'events/SPECIFIC_EVENTS';

const SpecificEvents = (events_data) => {
  return {
    type: SPECIFIC_EVENTS,
    payload: events_data,
  };
};

const EventsAll = (events_data) => {
  return {
    type: LOAD_EVENTS_ALL,
    payload: events_data,
  };
};
const AAEventsAll = (events_data) => {
  return {
    type: LOAD_AA_EVENTS_ALL,
    payload: events_data,
  };
};

export const loadAAEventsAll = () => async (dispatch) => {
  const res = await fetch('/api/events/all/AA');
  const data = await res.json();

  dispatch(AAEventsAll(data['events_all']));
  return data;
};

export const loadEventsAll = () => async (dispatch) => {
  const res = await fetch('/api/events/all');
  const data = await res.json();

  dispatch(EventsAll(data['events_all']));
  return data;
};

export const loadSpecificEvents = (query_str) => async (dispatch) => {
  const res = await fetch(`/api/events/${query_str}`);
  const data = await res.json();

  console.log(data);
  dispatch(SpecificEvents(data['specific_events']));
  return data;
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SPECIFIC_EVENTS:
      newState = {};
      action.payload.forEach((event) => {
        if (event['bet365_id']) {
          let eventTime = event.time;
          if (newState[event.time]) {
            eventTime = Math.floor(Math.random() * 1000) + 1 + event.time;
            console.log('inside check', eventTime);
          }
          console.log('newState', newState);
          newState[eventTime] = {
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
        }
      });
      return newState;
    case LOAD_EVENTS_ALL:
      newState = {};
      action.payload.forEach((event) => {
        if (event['bet365_id']) {
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
        }
      });
      return newState;
    case LOAD_AA_EVENTS_ALL:
      newState = {};
      action.payload.forEach((event) => {
        if (event['bet365_id']) {
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
        }
      });
      return newState;
    default:
      return newState;
  }
};

export default eventsReducer;
