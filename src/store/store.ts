import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { financesReducer } from "./slices/financesSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { calculatedFinancesReducer } from "./slices/calculatedFinancesSlice";

const financeReducerConfig = {
  key: "finances",
  storage
}

const categoriesReducerConfig = {
  key: "categories",
  storage
}

const persistedFinancesReducer = persistReducer(financeReducerConfig, financesReducer);
const persistedCategoriesReducer = persistReducer(categoriesReducerConfig, categoriesReducer);

const rootReducer = combineReducers({
  finances: persistedFinancesReducer,
  categories: persistedCategoriesReducer,
  calculatedFinances: calculatedFinancesReducer
});

export const store = configureStore({
  reducer: rootReducer,  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
