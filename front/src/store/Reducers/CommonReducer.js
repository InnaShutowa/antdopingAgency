import { createStore, combineReducers } from 'redux';
import UserReducer from './User';
import {persistStore, persistReducer, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistUserConfig = {
  key: 'sportsmenRoot',
  storage,
};

const persistConfig = {
  key: 'root',
  storage,
};


const persistedUserReducer = persistReducer(persistUserConfig, UserReducer);
const reducers = {
  UserReduser: persistedUserReducer
};

const reducersPersist = persistCombineReducers(persistConfig, reducers);

const CommonStore = createStore(reducersPersist);

export default CommonStore;