import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getRandomHealthTip } from './utilityFunctions';
import i18n from '../localization/i18n';

const HEALTH_TIP_NOTIFICATION_TASK = 'health-tip-notification';

const scheduleNotification = async () => {
  const message = getRandomHealthTip(i18n.locale)

  await Notifications.scheduleNotificationAsync({
      content: {
          title: 'Health Tip',
          body: message,
      },
      trigger: null
  });
};

TaskManager.defineTask(HEALTH_TIP_NOTIFICATION_TASK, async () => {
  try {
    await scheduleNotification();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(HEALTH_TIP_NOTIFICATION_TASK, {
    minimumInterval: 6* 60 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
  });
};

export const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(HEALTH_TIP_NOTIFICATION_TASK);
};

