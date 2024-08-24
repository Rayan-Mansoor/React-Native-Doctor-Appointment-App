import { Platform, PermissionsAndroid } from 'react-native';
import * as Notifications from 'expo-notifications';
import { storage as mmkvStorage } from '../storage/mmkvStorage';
import { getRandomHealthTip } from './utilityFunctions';
import i18n from '../localization/i18n';

export const setNotificationHandler = (enabled: boolean) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: enabled,
      shouldPlaySound: enabled,
      shouldSetBadge: enabled,
    }),
  });
};

const setInitialNotificationState = async () => {
    if (Platform.OS === 'android') {
      const notificationPermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (notificationPermissionReq === PermissionsAndroid.RESULTS.GRANTED) {
            setNotificationHandler(true)
      }
    }
  };

const saveNotificationState = (enabled: boolean) => {
    try {
      mmkvStorage.set('notificationsEnabled', enabled);
      console.log(`saveNotificationState ${enabled}`)

    } catch (error) {
      console.error('Error saving notification state:', error);
    }
  };
  
  const getNotificationState = () => {
    try {
      const value = mmkvStorage.getBoolean('notificationsEnabled');
      console.log(value)
      if (value !== undefined) {
        setNotificationHandler(value)
      } else {
        setInitialNotificationState()
      }
    } catch (error) {
      console.error('Error retrieving notification state:', error);
    }
  };

  export const scheduleNotification = async () => {
    const randomTip = getRandomHealthTip(i18n.locale);
  
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Health Tip",
        body: randomTip,
      },
      trigger: {
        seconds: 6,
      },
    });
  };
// set the nofication handler based on mmkv based. Also check initial launch condition when no value is present in mmkv storage

