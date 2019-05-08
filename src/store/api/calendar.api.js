import Firebase from 'firebase/app';

export const getEvents = () =>
  Firebase.firestore()
    .collection('events')
    .get()
    .then(typeSnapshot => {
      let events = {};
      typeSnapshot.forEach(doc => {
        events = {
          ...events,
          [doc.id]: doc.data(),
        };
      });
      return events;
    });

export const createEvent = (event, uid) => {
  const doc = {
    ...event,
    creator: uid,
    created: Firebase.firestore.FieldValue.serverTimestamp(),
  };
  return Firebase.firestore()
    .collection('events')
    .add(doc)
    .then(ref => ({ [ref.id]: doc }));
};
