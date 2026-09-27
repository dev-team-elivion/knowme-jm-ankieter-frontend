import dayjs, { Dayjs } from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const DATE_PICKER_FORMAT = DATE_FORMAT;

type FormatOptions = {
  withTime?: boolean;
};

export const parseApiDate = (value: null | string | undefined): Dayjs | null => {
  if (!value) {
    return null;
  }
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

export const formatDate = (date: Dayjs, options?: FormatOptions): string =>
  date.format(options?.withTime ? DATE_TIME_FORMAT : DATE_FORMAT);

export const formatApiDate = (
  value: null | string | undefined,
  options?: FormatOptions,
): null | string => {
  const parsed = parseApiDate(value);
  return parsed && formatDate(parsed, options);
};

export const toApiDate = (date: Dayjs): string => date.format(DATE_FORMAT);
