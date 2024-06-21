import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getRandomHealthTip } from './utilityFunctions';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

const scheduleNotification = async () => {
  const message = getRandomHealthTip()

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Health Tip',
      body: message,
    },
    trigger: {
      seconds: 10, 
    },
  });
};

console.log("TaskManager  haah called")


TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    console.log("TaskManager called")
  try {
    await scheduleNotification();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register background fetch
export const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 3600, // 1 hour
    stopOnTerminate: false,
    startOnBoot: true,
  });
};

// Unregister background fetch
export const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
};

