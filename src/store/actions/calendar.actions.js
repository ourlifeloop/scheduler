import { createAsyncTypes } from 'utils/store';

const ACTION_PREFIX = '@@calendar';
export const OPEN_CREATION_MODAL = `${ACTION_PREFIX}/OPEN_CREATION_MODAL`;
export const START_FORM = `${ACTION_PREFIX}/START_FORM`;
export const UPDATE_FORM = `${ACTION_PREFIX}/UPDATE_FORM`;
export const RESET_FORM = `${ACTION_PREFIX}/RESET_FORM`;
export const CANCEL_CREATE = `${ACTION_PREFIX}/CANCEL_CREATE`;
export const CREATE_EVENT = createAsyncTypes(`${ACTION_PREFIX}/CREATE_EVENT`);
export const UPDATE_EVENTS = createAsyncTypes(`${ACTION_PREFIX}/UPDATE_EVENTS`);

export const startForm = (start, end) => ({ type: START_FORM, start, end });
export const updateForm = form => ({ type: UPDATE_FORM, form });
export const cancelCreate = () => ({ type: CANCEL_CREATE });
export const createEvent = () => ({
  type: CREATE_EVENT.PENDING,
});
