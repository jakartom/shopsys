import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import sagaMonitor from '@redux-saga/simple-saga-monitor'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));

    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)
    return store
}