import { createNavigationContainerRef } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export function rootNavigation(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
