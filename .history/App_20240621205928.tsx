import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { Provider, useSelector } from 'react-redux';
import { useColorScheme } from './hooks/useColorScheme';
import store, { RootState } from './storage/reduxStore';
import i18n from './localization/i18n';

import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import Appointment from './screens/Appointment';
import DoctorCategory from './screens/DoctorCategory';
import DoctorList from './screens/DoctorList';
import LandingPage from './screens/LandingPage';
import Settings from './screens/Settings';
import ThemeProvider from './context/ThemeProvider';
import useVolumeButtonListener from './hooks/useVolumeButtonListener';
import { MicrophoneProvider } from './context/MicrophoneProvider';
import { scheduleNotification } from './utils/NotificationManager';
import { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from './utils/NotificationWorker';


export type RootStackParams = {
  LandingPage: any;
  Home: any;
  Appointment: any;
  DoctorCategory: any;
  DoctorList: any;
  About: any;
  Settings: any
};

const Stack = createNativeStackNavigator<RootStackParams>();

SplashScreen.preventAutoHideAsync();

function MainApp() {
  const language = useSelector((state: RootState) => state.language.locale);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const colorScheme = useColorScheme();
  useVolumeButtonListener();

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const notificationPermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (notificationPermissionReq !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("Notification permission denied");
      }
    }
    setPermissionChecked(true);
  };

  useEffect(() => {
    requestNotificationPermission();
    console.log("Registering background fetch async");
    registerBackgroundFetchAsync();

    return () => {
      console.log("Unregistering background fetch async");
      unregisterBackgroundFetchAsync();
    };
  }, []);

  useEffect(() => {
    i18n.locale = language;
    if (permissionChecked && language) {
      // scheduleNotification()
      SplashScreen.hideAsync();
    }
  }, [permissionChecked, language]);

  if (!permissionChecked || !language) {
    return null;
  }

  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="DoctorCategory" component={DoctorCategory} />
        <Stack.Screen name="DoctorList" component={DoctorList} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MicrophoneProvider>
          <MainApp />
        </MicrophoneProvider>
      </ThemeProvider>
    </Provider>
  );
}

