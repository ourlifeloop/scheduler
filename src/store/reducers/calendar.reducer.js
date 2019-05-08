import {
  OPEN_CREATION_MODAL,
  UPDATE_FORM,
  RESET_FORM,
} from 'store/actions/calendar.actions';

const initialForm = {
  title: '',
  description: '',
  start: null,
  end: null,
};

const initialState = {
  isCreationModalOpen: false,
  form: initialForm,
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATION_MODAL:
      return { ...state, isCreationModalOpen: true };
    case UPDATE_FORM:
      return { ...state, form: { ...state.form, ...action.form } };
    case RESET_FORM:
      return { ...state, form: initialForm, isCreationModalOpen: false };
    default:
      return state;
  }
}
