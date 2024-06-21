import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import { useColorScheme } from './hooks/useColorScheme';
import store from './storage/reduxStore';

import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import Appointment from './screens/Appointment';
import DoctorCategory from './screens/DoctorCategory';
import DoctorList from './screens/DoctorList';
import LandingPage from './screens/LandingPage';

export type RootStackParams = {
  LandingPage: any;
  Home: any;
  Appointment: any;
  DoctorCategory: any;
  DoctorList: any;
  About: any
}

const Stack = createNativeStackNavigator<RootStackParams>();

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [notificationPermissionChecked, setNotificationPermissionChecked] = useState(false);
  const [microphonePermissionChecked, setMicrophonePermissionChecked] = useState(false);
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const notificationPermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (notificationPermissionReq !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("Notification permission denied");
      }
    }
    setNotificationPermissionChecked(true);
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const microphonePermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (microphonePermissionReq !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("Microphone permission denied");
      }
    }
    setMicrophonePermissionChecked(true);
  };

  useEffect(() => {
    requestNotificationPermission();
    requestMicrophonePermission();
  }, []);

  useEffect(() => {
    if (notificationPermissionChecked && microphonePermissionChecked) {
      setPermissionChecked(true);
    }
  }, [notificationPermissionChecked, microphonePermissionChecked]);

  useEffect(() => {
    if (fontsLoaded && permissionChecked) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, permissionChecked]);

  if (!fontsLoaded || !permissionChecked) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="DoctorCategory" component={DoctorCategory} />
          <Stack.Screen name="DoctorList" component={DoctorList} />
          <Stack.Screen name="Appointment" component={Appointment} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
