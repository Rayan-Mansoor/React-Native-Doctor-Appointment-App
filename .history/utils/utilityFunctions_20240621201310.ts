import healthTipsData from '../storage/data/health_tips.json'

export const getRandomHealthTip = () => {
    const tips = healthTipsData;
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  };