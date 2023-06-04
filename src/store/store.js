import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/auth';
import NotesReducer from './reducers/notes';
import UserReducer from './reducers/user';


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, AuthReducer),
    notes: NotesReducer,
    user:UserReducer
  })
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)