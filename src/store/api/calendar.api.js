import Firebase from 'firebase/app';

export const getEventForMonth = monthKey =>
  Firebase.firestore()
    .collection('events')
    .where('months', 'array-contains', monthKey)
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

export const modifyEvent = event => {
  const doc = {
    ...event,
    created: Firebase.firestore.FieldValue.serverTimestamp(),
  };
  return Firebase.firestore()
    .collection('events')
    .add(doc)
    .then(ref => ({ [ref.id]: { id: ref.id, ...doc } }));
};

export const deleteEvent = event =>
  Firebase.firestore()
    .collection('events')
    .doc(event)
    .delete();
