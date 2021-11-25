import { APIEvent } from '../api/api';

interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

const memory = new Map<APIEvent['date'], DayMonthYear>();

/**
 * @example
 * convertAPIEventDateToDayMonthYear('14.09.2019');
 * // -> { day: '14'; month: '09'; year: '2019'; }
 */
export function convertEventDateToDayMonthYear(
  date: APIEvent['date']
): DayMonthYear {
  const memorizedValue = memory.get(date);

  if (memorizedValue !== undefined) {
    return memorizedValue;
  }

  const [day = '', month = '', year = ''] = date.split('.');
  const dayMonthYear: DayMonthYear = { day, month, year };

  memory.set(date, dayMonthYear);

  return dayMonthYear;
}
