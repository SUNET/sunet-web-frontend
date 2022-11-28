import config from '../../config.js'


export const formatDate = (d) => (
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
);

export const formatDateTime = (d) => (
  `${formatDate(d)} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')} UTC`
);

export const formatDateFromString = (s) => formatDate(new Date(s));

export const formatDateTimeFromString = (s) => formatDateTime(new Date(s));

export const formatDateTimePairFromString = (s) => {
  const dates = s.split('/');
  const start = formatDateTime(new Date(dates[0]));
  let end = ""
  if (dates[1].length > 4) {
    end = formatDateTime(new Date(dates[1]));
  }
  return `${start} - ${end}`;
};

export const formatDateTimePairsFromList = (pairs) => pairs.map( pair => formatDateTimePairFromString(pair) );

