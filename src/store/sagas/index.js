import user from './user.saga';
import calendar from './calendar.saga';

const sagas = [user, calendar];

export default sagaMiddleware =>
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));
