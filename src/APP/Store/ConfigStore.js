import {applyMiddleware,combineReducers,createStore} from  'redux';
import thunk from 'redux-thunk'
import {LoginReducer} from '../Reducers/LoginReducer';
const rootReducer=combineReducers({LoginReducer});
 const store=createStore(rootReducer,applyMiddleware(thunk));
 export default store;
