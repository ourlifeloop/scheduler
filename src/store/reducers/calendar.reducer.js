import {
  OPEN_EVENT_MODAL,
  UPDATE_FORM,
  RESET_FORM,
  CREATE_EVENT,
  FETCH_EVENTS,
  SELECT_EVENT,
} from 'store/actions/calendar.actions';
import { uniq } from 'constants/lodash';

const initialForm = {
  title: '',
  description: '',
  reason: '',
  start: null,
  end: null,
};

const initialState = {
  isEventFormModalOpen: false,
  isFetchingEvents: false,
  isManagingEvent: false,
  selectedEvent: null,
  form: initialForm,
  months: [],
  models: {},
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_MODAL:
      return { ...state, isEventFormModalOpen: true };
    case UPDATE_FORM:
      return { ...state, form: { ...state.form, ...action.form } };
    case RESET_FORM:
      return {
        ...state,
        form: initialForm,
        isEventFormModalOpen: false,
        selectedEvent: null,
      };
    case CREATE_EVENT.PENDING:
      return { ...state, isManagingEvent: true };
    case CREATE_EVENT.SUCCESS:
      return {
        ...state,
        models: { ...state.models, ...action.event },
        isManagingEvent: false,
        isEventFormModalOpen: false,
      };
    case CREATE_EVENT.ERROR:
      return { ...state, isManagingEvent: false };
    case FETCH_EVENTS.PENDING:
      return { ...state, isFetchingEvents: true };
    case FETCH_EVENTS.SUCCESS:
      return {
        ...state,
        models: { ...state.models, ...action.events },
        months: uniq([...state.months, action.month].filter(m => m)),
        isFetchingEvents: false,
      };
    case FETCH_EVENTS.ERROR:
      return { ...state, isFetchingEvents: false };
    case SELECT_EVENT:
      return { ...state, selectedEvent: action.key };
    default:
      return state;
  }
}
