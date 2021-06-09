/* ---- Imports Section */
import React from 'react';
import { object, array, bool, string } from 'prop-types';
import {
  DisplayStellia,
  DisplayDateTimeLocation,
  DisplayMethods,
} from './displayData';
import './main.css';
/* End ---- */

/* ---- Get Data for Display Components Section */
const CalculateStellia = ({ placementArr, placementSet }) => {
  const stellia = [];
  placementSet.forEach(sign => {
    let occurrences = placementArr.reduce(function (n, p) {
      return n + (p === sign);
    }, 0);
    if (occurrences >= 3) {
      stellia.push(
        { label: sign, occurrences: occurrences },
      );
    }
  });

  /* <-- Return UI --> */
  return (
    <DisplayStellia stellia={stellia} />
  );
}
const GetSignHouseSets = ({ planets, unknown }) => {
  /* <-- Variable Declarations --> */
  const placementArr = [];
  const placementSet = new Set();

  /* Add signs & houses w/ planets in them to arrays / sets */
  planets.forEach(planet => {
    /* <-- Variable Declarations --> */
    const sign = planet.Sign.label;
    const house = planet.House.label;

    /* Avoid adding data from non-planets to the arrays / sets */
    if (planet.label !== 'Chiron' && planet.label !== 'Sirius') {
      placementArr.push(sign);
      placementSet.add(sign);
      if (!unknown || unknown == null) {
        placementArr.push(house);
        placementSet.add(house);
      }
    }
  });

  /* <-- Return Component Call --> */
  return (
    <CalculateStellia placementArr={placementArr} placementSet={placementSet} />
  );
}
const GetDateTimeLocationMethods = ({ origin, zodiac, houseSystem, unknown }) => {
  return (
    <>
      <DisplayDateTimeLocation
        year={origin.year} month={origin.month} day={origin.date}
        hour={origin.hour} minute={origin.minute}
        latitude={origin.latitude} longitude={origin.longitude}
        unknown={unknown}
      />
      <DisplayMethods
        zodiac={zodiac}
        houseSystem={houseSystem}
      />
      {(unknown && unknown != null) ? (
        <>
          <p className='unknown'>* Houses cannot be calculated due to unknown birth time</p>
          <p className='unknown'>* Degrees & Minutes / Seconds are approx. due to unknown birth time</p>
        </>
      ) : (
        null
      )}
    </>
  );
}
/* End ---- */

/* ---- Exports Section */
export {
  CalculateStellia,
  GetSignHouseSets,
  GetDateTimeLocationMethods,
}
/* End ---- */

/* <- PropTypes -> */
GetSignHouseSets.propTypes = {
  planets: array,
  unknown: bool,
}
CalculateStellia.propTypes = {
  placementArr: array,
  placementSet: object,
}
GetDateTimeLocationMethods.propTypes = {
  origin: object,
  zodiac: string,
  houseSystem: string,
  unknown: bool,
}