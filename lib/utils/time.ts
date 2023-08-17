import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

export const getWeekDays = (date: Date) => {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
};

export const getCurrentWeekdays = () => {
  const now = new Date();

  return getWeekDays(now);
};
