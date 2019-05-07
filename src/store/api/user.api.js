import Firebase from 'firebase/app';

export const getCurrentUser = () =>
  new Promise(resolve => {
    Firebase.auth().onAuthStateChanged(user => {
      if (!(user || {}).uid) {
        return resolve(null);
      }
      return Firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            resolve({ ...doc.data(), ...user.toJSON() });
          }
          resolve(user.toJSON());
        });
    });
  });

export const signup = ({ email, password, confirm }) => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }
  if (password !== confirm) {
    throw new Error('Passwords do not match.');
  }
  return Firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }
  return Firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signout = () => Firebase.auth().signOut();

export const passwordReset = ({ email }) => {
  if (!email) {
    throw new Error('Email is required.');
  }
  return Firebase.auth().sendPasswordResetEmail(email);
};
