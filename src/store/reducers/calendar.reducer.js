import {
  OPEN_CREATION_MODAL,
  UPDATE_FORM,
  RESET_FORM,
  CREATE_EVENT,
  FETCH_EVENTS,
} from 'store/actions/calendar.actions';

const initialForm = {
  title: '',
  description: '',
  start: null,
  end: null,
};

const initialState = {
  isCreationModalOpen: false,
  isFetchingEvents: false,
  isCreatingEvent: false,
  form: initialForm,
  models: {},
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATION_MODAL:
      return { ...state, isCreationModalOpen: true };
    case UPDATE_FORM:
      return { ...state, form: { ...state.form, ...action.form } };
    case RESET_FORM:
      return { ...state, form: initialForm, isCreationModalOpen: false };
    case CREATE_EVENT.PENDING:
      return { ...state, isCreatingEvent: true };
    case CREATE_EVENT.SUCCESS:
      return {
        ...state,
        models: { ...state.models, ...action.event },
        isCreatingEvent: false,
        isCreationModalOpen: false,
      };
    case CREATE_EVENT.ERROR:
      return { ...state, isCreatingEvent: false };
    case FETCH_EVENTS.PENDING:
      return { ...state, isFetchingEvents: true };
    case FETCH_EVENTS.SUCCESS:
      return {
        ...state,
        models: { ...state.models, ...action.events },
        isFetchingEvents: false,
      };
    case FETCH_EVENTS.ERROR:
      return { ...state, isFetchingEvents: false };
    default:
      return state;
  }
}
