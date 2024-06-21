import englishHealthTipsData from '../storage/data/en_health_tips.json'
import urduHealthTipsData from '../storage/data/ur_health_tips.json'
import * as Localization from 'expo-localization';

const getHealthTips = () => {
    const locale = Localization.locale;
    if (locale.startsWith('en')) {
      return englishHealthTipsData;
    }
    return urduHealthTipsData;
  };

export const getRandomHealthTip = () => {
    const tips = getHealthTips();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
 };


