import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const getCurrentUser = () =>
  new Promise(resolve => {
    onAuthStateChanged(getAuth(), user => {
      if (!(user || {}).uid) {
        return resolve(null);
      }
      return resolve(user.toJSON());
    });
  });

export const signup = ({ email, password, confirm, displayName }) => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }
  if (password !== confirm) {
    throw new Error('Passwords do not match.');
  }
  if (!displayName) {
    throw new Error('Full name must be provided');
  }
  return createUserWithEmailAndPassword(
    getAuth(),
    email,
    password,
  ).then(response =>
    response.user.updateProfile({ displayName }).then(() => response),
  );
};

export const login = ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }
  return signInWithEmailAndPassword(getAuth(), email, password);
};

export const signout = () => signOut(getAuth());

export const passwordReset = ({ email }) => {
  if (!email) {
    throw new Error('Email is required.');
  }
  return sendPasswordResetEmail(getAuth(), email);
};
