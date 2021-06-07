/* ---- ESLint Disablers ---- */
/* eslint-disable no-unused-vars */

/* ---- Imports Section */
import React, { useState, useEffect } from 'react';
import { object, array, bool, string, number } from 'prop-types';
import { createInstances } from './astro.js';
import './main.css';
/* End ---- */

/* ---- Navigation UI ---- */
const Nav = () => {
  // Return UI
  return (
    <nav>
      <a href="https://keighly.ca">
        <h1>Keighly.ca</h1>
      </a>
      <ul>
        <li><a href="https://github.com/ALostCAWs"
          target="_blank"
          rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://keighly.ca">Gallery</a></li>
      </ul>
    </nav>
  );
}

/* ---- Get Data for Display Components Section */
const GetMethods = ({ zodiac, houseSystem }) => {
  const method = zodiac.charAt(0).toUpperCase() + zodiac.slice(1);
  const system = houseSystem.charAt(0).toUpperCase() + houseSystem.slice(1);
  return (
    <p>Methods: {method} & {system}</p>
  );
}
const GetDateTimeLocation = ({ year, month, day, hour, minute, latitude, longitude, unknown }) => {
  const dd = (day < 10) ? `0${day}` : `${day}`;
  const mm = ((month + 1) < 10) ? `0${month + 1}` : `${month + 1}`;
  const date = `${dd}-${mm}-${year}`;
  const EW = (longitude >= 0) ? `E` : `W`;
  const NS = (latitude >= 0) ? `N` : `S`;

  // Avoid display & calculations related to birth time if it's unknown
  if (!unknown || unknown == null) {
    let time = (hour < 10) ? `0${hour}:${minute}` : `${hour}:${minute}`;
    time = (hour < 12) ? time += `AM` : time += `PM`;
    return (<p>{date}, {time} at {Math.abs(latitude)}&deg; {NS}, {Math.abs(longitude)}&deg; {EW}</p>);
  } else {
    return (<p>{date} at {Math.abs(latitude)}&deg; {NS}, {Math.abs(longitude)}&deg; {EW}</p>);
  }
}
/* End ---- */

/* ---- Display Components */
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
const DisplayDateTimeLocation = ({ origin, zodiac, houseSystem, unknown }) => {
  return (
    <>
      <GetDateTimeLocation
        year={origin.year} month={origin.month} day={origin.date}
        hour={origin.hour} minute={origin.minute}
        latitude={origin.latitude} longitude={origin.longitude}
        unknown={unknown}
      />
      <GetMethods
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
const DisplayPlanetData = ({ planet, unknown }) => {
  /* Skip over non-planets that appear in the array */
  /* Avoid display of houses when birth time is unknown */
  if (planet !== 'Chiron' && planet !== 'Sirius') {
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
const DisplayHouseData = ({ house }) => {
  return (
    <>
      <p className='house'>{house.label} House</p>
      <p className='sign'>{house.Sign.label}</p>
    </>
  );
}
/* End ---- */

/* ---- Birth Chart Display ---- */
const AstroDisplay = ({ horoscope, unknown }) => {
  /* <-- Initial Logs --> */
  console.log(`. . .`);
  console.log(`Birth Chart:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
  const houses = horoscope._houses;
  console.log(houses);
  planets.forEach(planet => {
    const signArr = [];
    const houseArr = [];
    const signSet = new Set();
    const houseSet = new Set();
    const name = planet.key;
    const sign = planet.Sign.key;
    const house = planet.House.id;
    const degrees = planet.ChartPosition.Ecliptic.ArcDegreesFormatted30;
    const output = planet.isRetrograde ? `${degrees}r` : `${degrees}`;

    if (name !== 'sirius' && name !== 'chiron') {
      signArr.push(sign);
      houseArr.push(house);
      signSet.add(sign);
      houseSet.add(house);
    }
  });

  return (
    <>
      <article className='birth'>
        <h2>Birth Chart</h2>
        <div>
          <DisplayDateTimeLocation
            origin={origin}
            zodiac={horoscope._zodiac}
            houseSystem={horoscope._houseSystem}
            unknown={unknown}
          />
        </div>
        <div className='chart'>
          {planets.map((planet) => (
            <>
              <DisplayPlanetData
                planet={planet}
                unknown={unknown}
              />
            </>
          ))}
        </div>
        <div className='houses'>
          {!unknown ? (
            <>
              {houses.map((house) => (
                <>
                  <DisplayHouseData house={house} />
                </>
              ))
              }
            </>
          ) : (null)}
        </div>
      </article>
    </>
  );
}

/* ---- Moment Chart Display ---- */
const ChartOfTheMoment = ({ horoscope }) => {
  /* <-- Initial Logs --> */
  console.log(`. . .`);
  console.log(`Moment Chart:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Variable Declarations --> */
  const origin = horoscope.origin;
  const planets = horoscope._celestialBodies.all;
  const houses = horoscope._houses;
  console.log(houses);

  /* <-- Return UI --> */
  return (
    <>
      <article className='moment'>
        <h2>Chart of The Moment</h2>
        <div>
          <DisplayDateTimeLocation
            origin={origin}
            zodiac={horoscope._zodiac}
            houseSystem={horoscope._houseSystem}
          />
        </div>
        <div className='chart'>
          {planets.map((planet) => (
            <>
              <DisplayPlanetData planet={planet} />
            </>
          ))}
        </div>
        <div className='houses'>
          {houses.map((house) => (
            <>
              <DisplayHouseData house={house} />
            </>
          ))
          }
        </div>
      </article>
    </>
  );
}

const CreateHoroscope = ({ chartData }) => {
  /* <-- Horoscope --> */
  const horoscope = createInstances(
    chartData.year,
    chartData.month,
    chartData.day,
    chartData.hour,
    chartData.minute,
    chartData.latitude,
    chartData.longitude,
    chartData.zodiac,
    chartData.houseSystem
  );

  /* <-- Return UI --> */
  return (
    <>
      {chartData.type === 'moment' ? (
        <ChartOfTheMoment horoscope={horoscope} />
      ) : (
        <AstroDisplay
          horoscope={horoscope}
          unknown={chartData.unknown}
        />
      )}
    </>
  );
}

const AstroForm = ({ birthData, months, days, hours, minutes, zodiacs, houseSystems }) => {
  /* ---- Hooks ---- */
  /* <- State -> */
  const [formValues, setValues] = useState({
    year: 1998,
    month: 2,
    day: 29,
    hour: 9,
    minute: 10,
    latitude: 43.14,
    longitude: -80.25,
    zodiac: 'tropical',
    houseSystem: 'placidus',
  });
  const [unknown, setUnknown] = useState(false);
  const [useLocation, setLocation] = useState(false);
  const [submit, setSubmit] = useState(false);

  /* <- Effect -> */
  // formValues
  useEffect(() => {
    // console.log(formValues);
    // for (const [key, value] of Object.entries(birthData)) {
    //   console.log(`${key}: ${value}`);
    // }
  }, [formValues])

  // unknown
  useEffect(() => {
    if (unknown) {
      // Update birthData
      birthData.unknown = true;
      birthData.hour = 0;
      birthData.minute = 0;
      // Update form
      setValues({
        ...formValues,
        hour: 0,
        minute: 0
      });
    } else {
      birthData.unknown = false;
    }
  }, [unknown]);

  // useLocation
  useEffect(() => {
    if (useLocation) {
      /* <- Use Location -> */
      // Success
      const successFunction = async (position) => {
        // Process Data
        const lat = Math.round((position.coords.latitude + Number.EPSILON) * 100) / 100
        const lon = Math.round((position.coords.longitude + Number.EPSILON) * 100) / 100
        // momentChart
        MOMENTDATA.latitude = lat;
        MOMENTDATA.longitude = lon;
        // birthChart
        setValues({
          ...formValues,
          latitude: lat,
          longitude: lon,
        });
      }
      // Error
      const errorFunction = (position) => {
        alert('Error in retrieving current location.');
      }
      // Get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      } else {
        alert('It seems like Geolocation, which is required for this function, is not enabled in your browser.');
      }
    } else {
      /* <- Undo Use Location -> */
      // momentChart
      MOMENTDATA.latitude = 0;
      MOMENTDATA.longitude = 0;
      // birthChart
      setValues({
        ...formValues,
        latitude: 0.00,
        longitude: 0.00
      });
    }
  }, [useLocation]);

  /* <- Handle Input Changes & Form Submission -> */
  const handleChange = (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
    birthData[e.target.name] = e.target.value;

    if (e.target.name === 'zodiac' || e.target.name === 'houseSystem') {
      MOMENTDATA[e.target.name] = e.target.value;
    }
  }

  /* <-- Return UI --> */
  return (
    <>
      <article>
        {!submit ? (
          <>
            <h2>Enter Birth Info</h2>
            <form action='' id='birth-data'>
              <div className="date">
                <label htmlFor='year' className='date'>Year:</label>
                <input type='number' id='year' className='date' name='year' value={formValues.year} onChange={handleChange} />
                <label htmlFor='month' className='date'>Month:</label>
                <select id='month' className='date' name='month' value={formValues.month} onChange={handleChange}>
                  {months.map((month) => <option key={month.value} value={month.value}>{month.label}</option>)}
                </select>
                <label htmlFor='day' className='date'>Day:</label>
                <select id='day' className='date' name='day' value={formValues.day} onChange={handleChange}>
                  {days.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>

              <div className="time">
                <label htmlFor='hour' className='time'>Hour:</label>
                <select id='hour' className='time' name='hour' value={formValues.hour} onChange={handleChange} disabled={unknown}>
                  {hours.map((hour) => <option key={hour.value} value={hour.value}>{hour.label}</option>)}
                </select>
                <label htmlFor='minute' className='time'>Minute:</label>
                <select id='minute' className='time' name='minute' value={formValues.minute} onChange={handleChange} disabled={unknown}>
                  {minutes.map((min) => <option key={min} value={min}>{min}</option>)}
                </select>
                <label htmlFor='unknown' className='unknown'>Unknown:</label>
                <input type='checkbox' id='unknown' className='unknown' name='unknown' value={unknown} onChange={() => setUnknown(unknown => !unknown)}></input>
              </div>


              <div className="location">
                <label htmlFor='latitude' className='location'>Latitude:</label>
                <input type='number' id='latitude' className='location' name='latitude' min='-90.00' max='90.00' value={formValues.latitude} onChange={handleChange} />
                <label htmlFor='longitude' className='location'>Longitude:</label>
                <input type='number' id='longitude' className='location' name='longitude' min='-90.00' max='90.00' value={formValues.longitude} onChange={handleChange} />
                <button type='button' id='useLocation' className='location' name='useLocation' onClick={() => setLocation(useLocation => !useLocation)}>Use my Location</button>
              </div>

              <div className="system">
                <label htmlFor='zodiac' className='system'>Zodiac:</label>
                <select id='zodiac' className='system' name='zodiac' value={formValues.zodiacType} onChange={handleChange}>
                  {zodiacs.map((zodiac) => <option key={zodiac.value} value={zodiac.value}>{zodiac.label}</option>)}
                </select>
                <label htmlFor='houseSystem' className='system'>System:</label>
                <select id='houseSystem' className='system' name='houseSystem' value={formValues.zodiacType} onChange={handleChange}>
                  {houseSystems.map((system) => <option key={system.value} value={system.value}>{system.label}</option>)}
                </select>
              </div>
              <button type='button' id='submit' name='submit' onClick={() => setSubmit(true)}>Calculate Chart</button>
            </form>
          </>
        ) : (
          <CreateHoroscope chartData={birthData} />
        )}
      </article>
      <CreateHoroscope chartData={MOMENTDATA} />
    </>
  );
}

/* <- PropTypes -> */
ChartOfTheMoment.propTypes = {
  horoscope: object
}
AstroForm.propTypes = {
  birthData: object,
  months: array,
  days: array,
  hours: array,
  minutes: array,
  zodiacs: array,
  houseSystems: array,
}
CreateHoroscope.propTypes = {
  chartData: object,
}
AstroDisplay.propTypes = {
  horoscope: object,
  unknown: bool,
}
DisplayDateTimeLocation.propTypes = {
  origin: object,
  zodiac: string,
  houseSystem: string,
  unknown: bool,
}
DisplayPlanetData.propTypes = {
  planet: object,
}
DisplayHouseData.propTypes = {
  house: object,
}
GetDateTimeLocation.propTypes = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitude: number,
  longitude: number,
  unknown: bool,
}
DisplayDegreesMinutes.propTypes = {
  degreesFormatted: string,
  retrograde: bool,
}
GetMethods.propTypes = {
  zodiac: string,
  houseSystem: string,
}

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
  zodiac: 'tropical',
  houseSystem: 'placidus',
}
const BIRTHDATA = {
  type: 'birth',
  year: 1998,
  month: 2,
  day: 29,
  hour: 9,
  unknown: false,
  minute: 10,
  latitude: 43.14,
  longitude: -80.25,
  zodiac: 'tropical',
  houseSystem: 'placidus',
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

/* <- App() -> */
function App() {
  return (
    <>
      <Nav />
      <AstroForm
        birthData={BIRTHDATA}
        months={MONTHS}
        days={DAYS}
        hours={HOURS}
        minutes={MINUTES}
        zodiacs={ZODIACS}
        houseSystems={HOUSESYSTEMS}
      />

    </>
  );
}
export default App;