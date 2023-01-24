import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';
import cartReducer from './slices/cartSlice';

import filterReducer from './slices/filterSlice';
import { shopApi } from './api/shopApi';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { checkoutApi } from './api/checkoutApi';
import { orderApi } from './api/orderApi';


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({ 
    auth: authReducer,
    shop: shopReducer,
    filter: filterReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer, 
    [userApi.reducerPath]: userApi.reducer, 
    [checkoutApi.reducerPath]: checkoutApi.reducer, 
    [orderApi.reducerPath]: orderApi.reducer, 

  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const allMiddleware = [
          authApi.middleware,
          shopApi.middleware,
          userApi.middleware,
          checkoutApi.middleware,
          orderApi.middleware,
          thunk
        ];
        return getDefaultMiddleware({serializableCheck: false}).concat(...allMiddleware);
      },
});

export const persistor = persistStore(store);

