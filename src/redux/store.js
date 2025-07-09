import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Correct import for localStorage
import rootReducer from './reducers/rootReducers';

// Persist config
const persistConfig = {
  key: 'root',
  storage, // Use imported storage (localStorage by default)
  whitelist: ['auth'], // Only persist 'auth' reducer
  // Optional: Add version control for migrations
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'] // Required for redux-persist
      }
    }),
  devTools: process.env.NODE_ENV !== 'production' // Enable DevTools in development
});

export const persistor = persistStore(store);
