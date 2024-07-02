import { configureStore } from "@reduxjs/toolkit";

import { FLUSH, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "markdown-app",
    storage: storageSession,
    stateReconciler: autoMergeLevel2,
};


//@ts-expect-error value is correct
const persistedReducers = persistReducer(persistConfig, rootReducer);

const createStore = () =>
    configureStore({
        reducer: persistedReducers,
        middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER
                ],
            }
        })
    });

export const store = createStore();
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
