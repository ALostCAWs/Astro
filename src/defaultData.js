/* <- Defaults -> */
const moment = new Date();
const MOMENTDATA = {
  type: 'moment',
  year: moment.getFullYear(),
  month: moment.getMonth(),
  day: moment.getDate(),
  hour: moment.getHours(),
  minute: moment.getMinutes(),
  unknown: false,
  latitude: 43.14,
  longitude: -80.25,
  // zodiac: 'tropical',
  // houseSystem: 'placidus',
}
const BIRTHDATA = {
  type: 'birth',
};
/* <-- Populate Select Lists --> */
const MONTHS = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
];
const DAYS = [];
for (let i = 1; i < 32; i++) {
  DAYS.push(i);
}
const HOURS = [];
for (let i = 0; i < 24; i++) {
  const label = (i < 12) ? 'AM' : 'PM';
  const entry = { label: `${i} ${label}`, value: i };
  HOURS.push(entry);
}
const MINUTES = [];
for (let i = 0; i < 60; i++) {
  MINUTES.push(i);
}
const ZODIACS = [
  { label: 'Tropical', value: 'tropical' },
  { label: 'Sidereal', value: 'sidereal' },
];
const HOUSESYSTEMS = [
  { label: 'Placidus', value: 'placidus' },
  { label: 'Whole Sign', value: 'whole-sign' },
  { label: 'Equal House', value: 'equal-house' },
  { label: 'Koch', value: 'koch' },
  { label: 'Regiomontanus', value: 'regiomontanus' },
  { label: 'Topocentric', value: 'topocentric' },
];

/* ---- Exports Section */
export {
  MOMENTDATA,
  BIRTHDATA,
  MONTHS,
  DAYS,
  HOURS,
  MINUTES,
  ZODIACS,
  HOUSESYSTEMS,
}
/* End ---- */