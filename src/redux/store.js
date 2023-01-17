import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import shopReducer from './slices/shopSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { shopApi } from './api/shopApi';
import { authApi } from './api/authApi';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({ 
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer, 
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const allMiddleware = [
          authApi.middleware,
          shopApi.middleware,
          thunk
        ];
        return getDefaultMiddleware({serializableCheck: false}).concat(...allMiddleware);
      },
});

export const persistor = persistStore(store);

