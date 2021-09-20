import { createAsyncTypes } from 'utils/store';

const ACTION_PREFIX = '@@on-call';
export const FETCH_ON_CALL_STATE = createAsyncTypes(
  `${ACTION_PREFIX}/FETCH_CALL_STATE`,
);
