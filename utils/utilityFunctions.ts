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

 interface MarkedDates {
  [key: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    disabled?: boolean;
  };
}

 export const generateRandomDates = (numDates: number): MarkedDates => {
  const dates: MarkedDates = {};
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(startDate.getMonth() + 2);

  while (numDates > 0) {
    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
    const dateString = randomDate.toISOString().split('T')[0];
    if (!dates[dateString]) {
      dates[dateString] = { selected: true, marked: true, selectedColor: '#a7f432' };
      numDates--;
    }
  }

  return dates;
};

export interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}


export const getDisabledDates = (startDate: string, endDate: string, enabledDates: MarkedDates): MarkedDates => {
  const dates: MarkedDates = {};
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const dateString = currentDate.toISOString().split('T')[0];
    dates[dateString] = enabledDates[dateString] ? enabledDates[dateString] : { disabled: true };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};


export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

