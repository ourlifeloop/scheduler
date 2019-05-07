import { createAsyncTypes } from 'utils/store';

const ACTION_PREFIX = '@@user';
export const INITIALIZED = `${ACTION_PREFIX}/INITIALIZED`;
export const UPDATED_LOGIN_FORM = `${ACTION_PREFIX}/UPDATED_LOGIN_FORM`;
export const AUTHENTICATE = createAsyncTypes(`${ACTION_PREFIX}/AUTHENTICATE`);
export const SIGNED_OUT = createAsyncTypes(`${ACTION_PREFIX}/SIGNED_OUT`);

export const updateLoginForm = form => ({ type: UPDATED_LOGIN_FORM, form });
export const signout = () => ({ type: SIGNED_OUT.PENDING });
export const authenticate = () => ({
  type: AUTHENTICATE.PENDING,
});
