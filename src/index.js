import React, { StrictMode } from "react";
import * as ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import { Provider }  from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { shopApi } from "./redux/api/shopApi";
import { userApi } from "./redux/api/authApi";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
        </Provider>
    </StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <StrictMode>
//         <ApiProvider api={apiSlice}>
//             <App/>
//         </ApiProvider>
//     </StrictMode>
// );
