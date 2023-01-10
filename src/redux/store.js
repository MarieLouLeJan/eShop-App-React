import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({ 
    auth: authReducer,
    admin: adminReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [ thunk ]
    
});

export const persistor = persistStore(store);

