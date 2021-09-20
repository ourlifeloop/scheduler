import calendar from './calendar.saga';
import onCall from './on-call.saga';
import user from './user.saga';

const sagas = [calendar, onCall, user];

export default function sagaRunnr(sagaMiddleware) {
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));
}
