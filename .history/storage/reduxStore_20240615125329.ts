import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { reduxStorage } from "./key_value_storage/mmkvStorage";
import i18n from "@/i18n"; 

type SizeAdjustmentState = {
  adjustmentFactor: number;
}

const initialState = {
  adjustmentFactor: 0,
} as SizeAdjustmentState

const sizeAdjustmentSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    setAdjustmentFactor: (state, action: PayloadAction<number>) => {
      state.adjustmentFactor = action.payload;
    },
  },
});

type LanguageState = {
    locale: string;
};

const initialLanguageState = {
    locale: i18n.locale,
} as LanguageState

const languageSlice = createSlice({
  name: 'language',
  initialState: initialLanguageState,
  reducers: {
    setLanguage: (state, action) => {
        state.locale = action.payload;
       i18n.locale = action.payload;
    }
  }
});

const languagePersistConfig = {
  key: 'language',
  storage: reduxStorage,
};

const sizePersistConfig = {
  key: 'size',
  storage: reduxStorage,
};

const persistedLanguage = persistReducer(languagePersistConfig, languageSlice.reducer);
const persistedSize = persistReducer(sizePersistConfig, sizeAdjustmentSlice.reducer);

const store = configureStore({
  reducer: {
    language: persistedLanguage,
    size: persistedSize
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const { setLanguage } = languageSlice.actions;
export const { setAdjustmentFactor } = sizeAdjustmentSlice.actions;

export const persistor = persistStore(store);
export default store;
