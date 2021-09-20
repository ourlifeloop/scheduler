import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

export const ON_CALL_GROUP = {
  DEVELOPER: 'developer',
  QA: 'qa',
  SUPPORT: 'support',
};

const DEFAULT_STATE = {
  [ON_CALL_GROUP.DEVELOPER]: [],
  [ON_CALL_GROUP.QA]: [],
  [ON_CALL_GROUP.SUPPORT]: [],
  current: {
    [ON_CALL_GROUP.DEVELOPER]: null,
    [ON_CALL_GROUP.QA]: null,
    [ON_CALL_GROUP.SUPPORT]: null,
  },
};

export const getOnCallState = async () => {
  const docRef = await getDoc(
    doc(collection(getFirestore(), 'state'), 'on-call'),
  );
  return docRef.exists() ? docRef.data() : DEFAULT_STATE;
};

const updateOnCallState = state =>
  setDoc(doc(collection(getFirestore(), 'state'), 'on-call'), state);

export const createMember = async (currentState, group, memberName) => {
  const newState = {
    ...currentState,
    [group]: [...currentState[group], memberName],
  };
  await updateOnCallState(newState);
  return newState;
};

export const deleteMember = async (currentState, group, memberName) => {
  const newState = {
    ...currentState,
    [group]: currentState[group].filter(name => name !== memberName),
  };
  await updateOnCallState(newState);
  return newState;
};
