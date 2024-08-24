import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { reduxStorage } from "./mmkvStorage";
import i18n from "../localization/i18n"; 
import { Doctor } from "./data/en_doctor_list";
import { v4 as uuidv4 } from 'uuid';


type UserState = {
  name: string;
  email: string;
  phone: string;
}

const initialUserState: UserState = {
  name: '',
  email: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});

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

type ThemeState = {
  theme: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

const initialThemeState = {
  theme: 'normal',
} as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export interface Appointment {
  id: string;
  doctor: Doctor;
  dateTime: string;
}

type AppointmentsState = {
  upcomingAppointments: Appointment[];
}

const initialAppointmentState = {
  upcomingAppointments: [],
} as AppointmentsState;

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: initialAppointmentState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      const appointment = action.payload;
      if (!appointment.id) {
        appointment.id = uuidv4();
      }
      state.upcomingAppointments.push(appointment);
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.upcomingAppointments = state.upcomingAppointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.upcomingAppointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.upcomingAppointments[index] = action.payload;
      }
    },
  },
});

const userPersistConfig = {
  key: 'user',
  storage: reduxStorage,
};

const languagePersistConfig = {
  key: 'language',
  storage: reduxStorage,
};

const sizePersistConfig = {
  key: 'size',
  storage: reduxStorage,
};

const themePersistConfig = {
  key: 'theme',
  storage: reduxStorage,
};

const appointmentPersistConfig = {
  key: 'appointments',
  storage: reduxStorage,
};

const persistedUser = persistReducer(userPersistConfig, userSlice.reducer);
const persistedLanguage = persistReducer(languagePersistConfig, languageSlice.reducer);
const persistedSize = persistReducer(sizePersistConfig, sizeAdjustmentSlice.reducer);
const persistedTheme = persistReducer(themePersistConfig, themeSlice.reducer);
const persistedAppointments = persistReducer(appointmentPersistConfig, appointmentsSlice.reducer);

const store = configureStore({
  reducer: {
    language: persistedLanguage,
    size: persistedSize,
    theme: persistedTheme,
    appointments: persistedAppointments,
    user: persistedUser
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
export const { setTheme } = themeSlice.actions;
export const { addAppointment, removeAppointment, updateAppointment } = appointmentsSlice.actions;
export const { setName, setEmail, setPhone } = userSlice.actions;

export const persistor = persistStore(store);
export default store;
