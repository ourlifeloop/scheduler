import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export const getEventForMonth = async monthKey => {
  const typeSnapshot = await getDocs(
    query(
      collection(getFirestore(), 'events'),
      where('months', 'array-contains', monthKey),
    ),
  );

  let events = {};
  typeSnapshot.forEach(doc => {
    events = {
      ...events,
      [doc.id]: doc.data(),
    };
  });

  return events;
};

export const createEvent = async event => {
  const docRef = await addDoc(collection(getFirestore(), 'events'), {
    ...event,
    created: serverTimestamp(),
  });

  return { [docRef.id]: { id: docRef.id, ...event } };
};

export const editEvent = async (id, event) =>
  setDoc(doc(getFirestore(), 'events', id), event, { merge: true });

export const deleteEvent = id => deleteDoc(doc(getFirestore(), 'events', id));
