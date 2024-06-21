import englishHealthTipsData from '../storage/data/en_health_tips.json'
import urduHealthTipsData from '../storage/data/ur_health_tips.json'

const getHealthTips = (lang: string) => {
    return lang == 'en' ? englishHealthTipsData : urduHealthTipsData
  };

export const getRandomHealthTip = (lang: string) => {
    const tips = getHealthTips(lang);
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
 };


