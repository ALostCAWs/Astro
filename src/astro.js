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
const createOrigin = function (year, month, date, hour, minute, latitude, longitude) {
  /*
    <- Params ->
  */
  // year             - value >= 0 C.E.
  // month            - 0 = Jan, 11 = Dec
  // date             - 1...31
  // hour             - local time - hour value (0...23)
  // minute           - local time - minute value (0...59)
  // latitude         - lat. in decimal format (-90.00...90.00)
  // longitude        - long. in decimal format (-90.00...90.00)

  /*
    <- Notes ->
  */
  // This class automatically derives the local timezone from lat. / long. coords
  // Calculates UTC time w/ respect to timezone & historical daylight savings time
  // Works only for C.E. date (> 0)
  const origin = new Origin({ year, month, date, hour, minute, latitude, longitude });
  return origin;
}

const createHoroscope = function (origin, houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs, language) {
  /*
    <- Params ->
  */
  // houseSystem      - placidus, koch, whole-sign, equal-house, regiomontanus, topocentric
  // zodiac           - tropical, sidereal
  // aspectPoints     - bodies, points, angles (array w/ none or all of these options, determine starting points for aspect generation)
  // aspectWithPoints - bodies, points, angles (array w/ none or all of these options, determine starting points for aspect generation)
  // aspectTypes      - major, minor, conjunction, opposition (array w/ none or all of these options, chooses which aspects to calculate)
  // customOrbs       - an obj w/ keys set to override default orbs & set your own for aspect calculation
  // language         - en, es, etc. (return labels & results in a specific language)

  /*
    <- Note ->
  */
  // bodies = planets, points = lunar nodes / lilith, angles = ASC / MC
  // can pass in individual bodies, points, or angles in aspectPoints or aspectWithPoints
  // e.x. -> { aspectPoints: ["sun"], aspectWithPoints: ["moon"], aspectTypes: ["major", "quincunx"] }
  // only calculates sun to moon major or quincunx aspects, if they exist
  // all usable keys found in ./src/constant.js under BODIES, POINTS, ANGLES

  const horoscope = new Horoscope({ origin, language, houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs });
  return horoscope;
}

const createOrbs = function (
  conjunction,
  opposition,
  square,
  trine,
  sextile,
  quintile,
  septile,
  // octile,
  // novile,
  semiSextile,
  quincunx,
  // sesquiquadrate
) {
  const customOrbs = {
    conjunction,
    opposition,
    square,
    trine,
    sextile,
    quintile,
    septile,
    // octile,
    // novile,
    "semi-sextile": semiSextile,
    quincunx,
    // sesquiquadrate
  }
  return customOrbs;
}

/*
    ---- Instance Creation ----
*/
export const createInstances = (year, month, date, hour, minute, latitude, longitude) => {
  /*
    <- Origin ->
  */
  const origin = createOrigin(year, month, date, hour, minute, latitude, longitude);
  // const origin = createOrigin(1998, 2, 29, 9, 10, 43.14, -80.25);

  /*
    <- Orbs ->
  */
  // Currently passing the default orbs for birth & composite charts ->
  // https://astro-charts.com/blog/2018/how-customize-orbs-your-charts/
  const orbs = createOrbs(8, 8, 7, 8, 6, 1, 1, /*1, 0,*/ 1, 5, /*1*/);
  // conjunction, opposition, square, trine, sextile, quintile, septile, octile, novile, semiSextile, quincunx, sesquiquadrate

  /*
    <- Horoscope ->
  */
  horoscope = createHoroscope(
    origin,
    'placidus',
    'tropical',
    ['all'],
    ['all'],
    ['major', 'minor'],
    orbs,
    'en',
  );
  return horoscope;
}

export const findStellia = (placementsArr, placement) => {
  let numOfPlacements = placementsArr.reduce(function (n, p) {
    return n + (p === placement);
  }, 0);

  return numOfPlacements;
}