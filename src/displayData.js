/* ---- Imports Section */
import React from 'react';
import { object, array, bool, string, number } from 'prop-types';
/* End ---- */

/* ---- Display Components */
const DisplayMethods = ({ zodiac, houseSystem }) => {
  const method = zodiac.charAt(0).toUpperCase() + zodiac.slice(1);
  const system = houseSystem.charAt(0).toUpperCase() + houseSystem.slice(1);
  return (
    <p>Methods: {method} & {system}</p>
  );
}
const DisplayDateTimeLocation = ({ year, month, day, hour, minute, latitude, longitude, unknown }) => {
  const dd = (day < 10) ? `0${day}` : `${day}`;
  const mm = ((month + 1) < 10) ? `0${month + 1}` : `${month + 1}`;
  const date = `${dd}-${mm}-${year}`;
  const EW = (longitude >= 0) ? `E` : `W`;
  const NS = (latitude >= 0) ? `N` : `S`;

  /* Avoid display & calculations related to birth time if it's unknown */
  if (!unknown || unknown == null) {
    let time = (hour < 10) ? `0${hour}:${minute}` : `${hour}:${minute}`;
    time = (hour < 12) ? time += `AM` : time += `PM`;
    return (<p>{date}, {time} at {Math.abs(latitude)}&deg; {NS}, {Math.abs(longitude)}&deg; {EW}</p>);
  } else {
    return (<p>{date} at {Math.abs(latitude)}&deg; {NS}, {Math.abs(longitude)}&deg; {EW}</p>);
  }
}
const DisplayPlanetData = ({ planet, unknown }) => {
  /* Skip over non-planets that appear in the array */
  /* Avoid display of houses when birth time is unknown */
  if (planet.label !== 'Chiron' && planet.label !== 'Sirius') {
    return (
      <>
        <p className='planet'>{planet.label}</p>
        <p className='sign'>{planet.Sign.label}</p>
        <DisplayDegreesMinutes
          degreesFormatted={planet.ChartPosition.Ecliptic.ArcDegreesFormatted30}
          retrograde={planet.isRetrograde}
        />

        {(!unknown || unknown == null) ? (
          <p className='house'>{planet.House.id}</p>
        ) : (
          <p className='house'>-</p>
        )}
      </>
    );
  } else {
    return (null);
  }
}
const DisplayDegreesMinutes = ({ degreesFormatted, retrograde }) => {
  const deg = degreesFormatted.slice(0, 4).trim();
  const minSec = degreesFormatted.slice(deg.length + 1, degreesFormatted.length).trim();
  return (
    <>
      {(retrograde) ? (
        <p className='degrees'>{deg} {minSec} R</p>
      ) : (
        <p className='degrees'>{deg} {minSec}</p>
      )}
    </>
  );
}
const DisplayHouseData = ({ house }) => {
  return (
    <>
      <p className='house'>{house.label} House</p>
      <p className='sign'>{house.Sign.label}</p>
    </>
  );
}
const DisplayStellia = ({ stellia }) => {
  console.log(stellia);
  /* <-- Return UI --> */
  /* Avoid displaying empty stellia grids */
  return (
    <>
      {stellia.length != 0 ? (
        <>
          {stellia.map((stellium) => (
            <>
              <p className='label'>{stellium.label}</p>
              <p className='occurrences'>{stellium.occurrences}</p>
            </>
          ))}
        </>
      ) : (
        <p className='no-stellia'>No stellia found in the given chart</p>
      )}
    </>
  );
}
/* End ---- */

/* ---- Exports Section */
export {
  DisplayMethods,
  DisplayDateTimeLocation,
  DisplayPlanetData,
  DisplayHouseData,
  DisplayStellia,
}
/* End ---- */

/* <- PropTypes -> */
DisplayPlanetData.propTypes = {
  planet: object,
}
DisplayHouseData.propTypes = {
  house: object,
}
DisplayDegreesMinutes.propTypes = {
  degreesFormatted: string,
  retrograde: bool,
}
DisplayStellia.propTypes = {
  stellia: array,
}
DisplayDateTimeLocation.propTypes = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitude: number,
  longitude: number,
  unknown: bool,
}
DisplayMethods.propTypes = {
  zodiac: string,
  houseSystem: string,
}