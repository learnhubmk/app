import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { editorSlice } from './Slices';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedEditorSliceReducer = persistReducer(persistConfig, editorSlice.reducer);

export const store = configureStore({
  reducer: {
    editorState: persistedEditorSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  // devTools: process.env.NODE_ENV !== "production",
  devTools: false,
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

export * from './Slices';
