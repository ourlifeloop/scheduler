import Firebase from 'firebase/app';

export const getEventForMonth = (year, month) =>
  Firebase.firestore()
    .collection('events')
    .where('months', 'array-contains', `${year}-${month}`)
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

export const createEvent = event => {
  const doc = {
    ...event,
    created: Firebase.firestore.FieldValue.serverTimestamp(),
  };
  return Firebase.firestore()
    .collection('events')
    .add(doc)
    .then(ref => ({ [ref.id]: doc }));
};
