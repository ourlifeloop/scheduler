import { FETCH_ON_CALL_STATE } from 'store/actions/on-call.actions';

const initialState = {
  isFetching: true,
  state: undefined,
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case FETCH_ON_CALL_STATE.PENDING:
      return { ...state, isFetching: true };
    case FETCH_ON_CALL_STATE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        state: action.state,
      };
    case FETCH_ON_CALL_STATE.ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
