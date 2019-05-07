import {
  LOGGED_IN,
  SIGNED_OUT,
  INITIALIZED,
  PASSWORD_RESET,
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
    case LOGGED_IN.PENDING:
    case PASSWORD_RESET.PENDING:
      return { ...state, isLoggingIn: true, error: null };
    case LOGGED_IN.ERROR:
    case PASSWORD_RESET.ERROR:
      return { ...state, isLoggingIn: false, error: action.error };
    case PASSWORD_RESET.SUCCESS:
      return { ...state, isLoginModalOpen: false };
    case LOGGED_IN.SUCCESS:
      return {
        ...state,
        error: null,
        isLoggingIn: false,
        isInitialized: true,
        isLoginModalOpen: false,
        model: { ...(state.model || {}), ...action.user },
        userForm: {
          email: (action.user || {}).email,
          username: (action.user || {}).username || '',
          ...state.userForm,
        },
      };
    case SIGNED_OUT.SUCCESS:
      return {
        ...initialState,
        isInitialized: true,
      };
    default:
      return state;
  }
}
