import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import initSagas from './sagas';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    combineReducers({
      router: routerReducer,
      ...reducers,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware)),
  );
  const history = reachify(createReduxHistory(store));
  initSagas(sagaMiddleware);
  return { store, history };
};
