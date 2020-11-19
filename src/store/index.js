import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, compose(devTools, applyMiddleware(thunk)));
export default store;
