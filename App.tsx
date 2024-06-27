import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, useSelector } from 'react-redux';
import { useColorScheme } from './hooks/useColorScheme';
import store, { RootState } from './storage/reduxStore';
import i18n from './localization/i18n';
import { useTheme } from './context/ThemeProvider';

import LandingPage from './screens/LandingPage';
import Settings from './screens/Settings';
import ThemeProvider from './context/ThemeProvider';
import useVolumeButtonListener from './hooks/useVolumeButtonListener';
import { MicrophoneProvider, useMicrophone } from './context/MicrophoneProvider';
import { registerBackgroundFetchAsync } from './utils/NotificationWorker';
import * as TaskManager from 'expo-task-manager';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAppointments from './screens/MyAppointments';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TooltipProvider } from './context/TooltipProvider';
import RecordingToast from './components/RecordingToast';
import { navigationRef } from './components/RootNavigation';
import 'react-native-get-random-values'

const HEALTH_TIP_NOTIFICATION_TASK = 'health-tip-notification';

export type RootTabParams = {
  LandingPage: any;
  MyAppointments: any
  Settings: any
};

const Tab = createBottomTabNavigator<RootTabParams>();

SplashScreen.preventAutoHideAsync();

function MainApp() {
  const language = useSelector((state: RootState) => state.language.locale);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const colorScheme = useColorScheme();
  const theme = useTheme();
  useVolumeButtonListener();
  const { isListening } = useMicrophone();

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
    checkNotificationTaskRegisteration();
  }, []);

  useEffect(() => {
    checkNotificationTaskRegisteration();
  }, []);

  const checkNotificationTaskRegisteration = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(HEALTH_TIP_NOTIFICATION_TASK);
    if (!isRegistered) {
      await registerBackgroundFetchAsync();
    }
  };

  useEffect(() => {
    i18n.locale = language;
    if (permissionChecked && language) {
      SplashScreen.hideAsync();
    }
  }, [permissionChecked, language]);

  if (!permissionChecked || !language) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
        <StatusBar style="auto" backgroundColor={theme.primaryMain}/>
        <Tab.Navigator screenOptions={{ headerShown: false , tabBarShowLabel: false}}>
          <Tab.Screen name="LandingPage" component={LandingPage} options={{ tabBarIcon: ({ focused, size }) => <Entypo name="home" size={size} color={focused ? theme.primaryMain : theme.secondaryText}/>  }}/>
          <Tab.Screen name="MyAppointments" component={MyAppointments} options={{ tabBarIcon: ({ focused, size }) => <FontAwesome5 name="notes-medical" size={size} color={focused ? theme.primaryMain : theme.secondaryText} />  }}/>
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: ({ focused, size }) => <Ionicons name="settings-sharp" size={size} color={focused ? theme.primaryMain : theme.secondaryText} />  }}/>
        </Tab.Navigator>
      </NavigationContainer>
      {isListening && <RecordingToast />}
    </View>
  );
}

export default function App() {  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MicrophoneProvider>
          <TooltipProvider>
            <MainApp />
          </TooltipProvider>
        </MicrophoneProvider>
      </ThemeProvider>
    </Provider>
  );
}


