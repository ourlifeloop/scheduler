import { createAsyncTypes } from 'utils/store';

const ACTION_PREFIX = '@@on-call';
export const FETCH_ON_CALL_STATE = createAsyncTypes(
  `${ACTION_PREFIX}/FETCH_CALL_STATE`,
);
export const CREATE_MEMBER = createAsyncTypes(`${ACTION_PREFIX}/CREATE_MEMBER`);
export const DELETE_MEMBER = createAsyncTypes(`${ACTION_PREFIX}/DELETE_MEMBER`);

export const createMember = (group, member) => ({
  type: CREATE_MEMBER.PENDING,
  group,
  member,
});
export const deleteMember = (group, member) => ({
  type: DELETE_MEMBER.PENDING,
  group,
  member,
});
