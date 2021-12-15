import { createStore, applyMiddelware } from 'redux';
import { composeWhithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store = createStore (rootReducer, composeWhithDevTools(applyMiddelware(thunk)))
