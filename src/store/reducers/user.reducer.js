import {
  AUTHENTICATE,
  SIGNED_OUT,
  INITIALIZED,
  UPDATED_LOGIN_FORM,
} from 'store/actions/user.actions';

const initialLoginForm = {
  email: '',
  password: '',
  confirm: '',
};

const initialState = {
  isInitialized: false,
  isLoggingIn: false,
  loginForm: initialLoginForm,
  model: null,
  error: null,
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
      return { ...state, isInitialized: true };
    case AUTHENTICATE.PENDING:
      return { ...state, isLoggingIn: true, error: null };
    case AUTHENTICATE.ERROR:
      return { ...state, isLoggingIn: false, error: action.error };
    case AUTHENTICATE.SUCCESS:
      return {
        ...state,
        error: null,
        isLoggingIn: false,
        isInitialized: true,
        model: { ...(state.model || {}), ...action.user },
        userForm: {
          email: (action.user || {}).email,
          username: (action.user || {}).username || '',
          ...state.userForm,
        },
      };
    case UPDATED_LOGIN_FORM:
      return { ...state, loginForm: { ...state.loginForm, ...action.form } };
    case SIGNED_OUT.SUCCESS:
      return {
        ...initialState,
        isInitialized: true,
      };
    default:
      return state;
  }
}
