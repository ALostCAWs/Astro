/*
    ---- Imports ----
*/
import { Origin, Horoscope } from "circular-natal-horoscope-js";

/*
  ---- Globals ----
*/
export let horoscope;

/*
    ---- Create Class Instances ----
*/
const createOrbs = function (
  conjunction,
  opposition,
  square,
  trine,
  sextile,
  quintile,
  septile,
  semiSextile,
  quincunx,
) {
  const customOrbs = {
    conjunction,
    opposition,
    square,
    trine,
    sextile,
    quintile,
    septile,
    "semi-sextile": semiSextile,
    quincunx,
  }
  return customOrbs;
}
const createOrigin = function (year, month, date, hour, minute, latitude, longitude) {
  const origin = new Origin({ year, month, date, hour, minute, latitude, longitude });
  return origin;
}
const createHoroscope = function (origin, houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs, language) {
  const horoscope = new Horoscope({ origin, language, houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs });
  return horoscope;
}

/*
    ---- Instance Creation ----
*/
export const createInstances = (year, month, date, hour, minute, latitude, longitude, zodiac, houseSystem) => {
  /* <- Origin -> */
  const origin = createOrigin(year, month, date, hour, minute, latitude, longitude);
  /* <- Orbs -> */
  const orbs = createOrbs(8, 8, 7, 8, 6, 1, 1, /*1, 0,*/ 1, 5, /*1*/);
  /* <- Horoscope -> */
  horoscope = createHoroscope(
    origin,
    houseSystem,
    zodiac,
    ['all'],
    ['all'],
    ['major', 'minor'],
    orbs,
    'en',
  );
  return horoscope;
}