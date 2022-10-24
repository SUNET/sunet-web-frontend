import config from '../../config.js'


export const formatDateTime = (d) => (
  `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()} UTC`
);

export const formatDate = (d) => (
  `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`
);
