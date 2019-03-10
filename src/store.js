import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { load, save } from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
