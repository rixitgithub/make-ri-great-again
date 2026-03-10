import dayjs from 'dayjs';

export const formatDate = (
  dateString: string,
  format: string = 'MMMM D, YYYY'
): string => {
  return dayjs(dateString).format(format);
};

export const formatDateToCustomFormat = (
  date: string | number | Date | dayjs.Dayjs
): string => {
  return dayjs(date).format('DD-MMM-YYYY');
};

export const formatCreatedAt = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const createdAt = new Date(date);
  const formattedDate = createdAt.toLocaleString('en-US', options);

  return formattedDate;
};

export const formatWithDaySuffix = (
  date: string | number | Date | dayjs.Dayjs
): string => {
  const day = dayjs(date).format('D');
  const dayNumber = parseInt(day, 10);

  const suffix =
    dayNumber === 1 || dayNumber === 21 || dayNumber === 31
      ? 'st'
      : dayNumber === 2 || dayNumber === 22
      ? 'nd'
      : dayNumber === 3 || dayNumber === 23
      ? 'rd'
      : 'th';

  return dayjs(date).format(`DD[${suffix}] MMMM, YYYY`);
};

export const getDaysFromToday = (date: string) => {
  const today = dayjs();
  const date1 = dayjs(date);

  return date1.startOf('day').diff(today.startOf('day'), 'day');
};
