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


// export const formatTime = (date: Date) => {
//   let hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes;
//   return `${hours}:${minutesStr} ${ampm}`;
// };

export function formatDate(date: Date): string {
  // Define arrays for days of the week and months
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Extract hours, minutes, day of the week, day of the month, month, and year
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns month index from 0-11
  const year = date.getFullYear();
  
  // Determine AM/PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes with leading zero if necessary
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // Construct the formatted string
  const formattedDate = `${hours}:${minutesStr} ${ampm}, ${dayOfWeek}, ${dayOfMonth}/${month}/${year}`;
  
  return formattedDate;
}

