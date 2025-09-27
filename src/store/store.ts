import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./AuthSlice";
import jobRequirementReducer from "./JobRequirementSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "jobRequirement"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  jobRequirement: jobRequirementReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // supaya redux-persist bisa simpan tanpa warning
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
