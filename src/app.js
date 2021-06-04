/* <-- ESLint Disablers --> */
/* eslint-disable no-unused-vars */

/* <-- Imports --> */
import React, { useState, useEffect } from 'react';
import { object, array, bool, string, number } from 'prop-types';
import {
  createInstances,
  // findStellia,
  // horoscope
} from './astro.js';
import './main.css';

/* <-- Navigation UI --> */
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

const GetMethods = ({ zodiac, houseSystem }) => {
  const method = zodiac.charAt(0).toUpperCase() + zodiac.slice(1);
  const system = houseSystem.charAt(0).toUpperCase() + houseSystem.slice(1);
  return (
    <p>Methods: {method} & {system}</p>
  );
}

const GetDegreesMinutes = ({ degreesFormatted }) => {
  const deg = degreesFormatted.slice(0, 4).trim();
  const minSec = degreesFormatted.slice(deg.length + 1, degreesFormatted.length).trim();
  console.log(deg);
  console.log(minSec);
  return (
    <p className='degrees'>{deg} {minSec}</p>
  );
}

const GetDateTimeLocation = ({ year, month, day, hour, minute, latitude, longitude }) => {
  const dd = (day < 10) ? `0${day}` : `${day}`;
  const mm = (month < 10) ? `0${month}` : `${month}`;
  const date = `${dd}-${mm}-${year}`;
  let time = (hour < 10) ? `0${hour}:${minute}` : `${hour}:${minute}`;
  time = (hour < 12) ? time += `AM` : time += `PM`;
  const EW = (longitude > 0) ? `E` : `W`;
  const NS = (latitude > 0) ? `N` : `S`;
  return (
    <p>{date}, {time} at {Math.abs(latitude)}&deg; {NS}, {Math.abs(longitude)}&deg; {EW}</p>
  );
}

const AstroDisplay = ({ horoscope, unknown }) => {
  /* <-- Initial Logs --> */
  console.log(`. . .`);
  console.log(`Birth Chart:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;
  console.log(`${origin.year}-${origin.month}-${origin.date} ${origin.hour}:${origin.minute}`);

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
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

    console.log(`${name}  |  ${sign}  | ${house}`);
    console.log(output);
    console.log(planet.ChartPosition);
  });

  return (
    <>
      <article className='birth'>
        <h2>Birth Chart</h2>
        <p>Zodiac: {horoscope._zodiac}</p>
        <p>House System: {horoscope._houseSystem}</p>
        {!unknown ? (
          <>{planets.map((p) => (<p key={p.key}>{p.key} is in {p.Sign.key} in House #{p.House.id}</p>))}</>
        ) : (
          <>{planets.map((p) => (<p key={p.key}>{p.key} is in {p.Sign.key}</p>))}</>
        )}
      </article>
    </>
  );
}

/* ---- Moment Display ---- */
const ChartOfTheMoment = ({ horoscope }) => {
  /* <-- Initial Logs --> */
  console.log(`Chart of the Moment:`);
  console.log(horoscope);
  console.log(horoscope.origin);
  console.log(horoscope._houseSystem);
  console.log(`. . .`);

  // /* <-- Variable Declarations --> */
  const origin = horoscope.origin;
  const planets = horoscope._celestialBodies.all;
  // console.log(`${origin.year}-${origin.month}-${origin.date} ${origin.hour}:${origin.minute}`);

  // /* <-- Planet, Sign, House Logs --> */

  // const signArr = [];
  // const houseArr = [];
  // const signSet = new Set();
  // const houseSet = new Set();
  // planets.forEach(planet => {
  //   const name = planet.key;
  //   const sign = planet.Sign.key;
  //   const house = planet.House.id;

  //   console.log(`${name}      |   ${sign}   |   ${house}`);
  //   if (name !== 'sirius' && name !== 'chiron') {
  //     signArr.push(sign);
  //     houseArr.push(house);
  //     signSet.add(sign);
  //     houseSet.add(house);
  //   }
  // });

  // signSet.forEach(sign => {
  //   console.log(sign);
  //   const numOfSign = findStellia(signArr, sign);
  //   console.log(`${numOfSign} placements in ${sign}`);
  // });

  // houseSet.forEach(house => {
  //   console.log(house);
  //   const numOfHouse = findStellia(houseArr, house);
  //   console.log(`${numOfHouse} placements in house # ${house}`);
  // });
  /* <-- Return UI --> */
  return (
    <>
      <article className='moment'>
        <h2>Chart of The Moment</h2>
        <div>
          <GetDateTimeLocation
            year={origin.year} month={origin.month} day={origin.date}
            hour={origin.hour} minute={origin.minute}
            latitude={origin.latitude}
            longitude={origin.longitude}
          />
          <GetMethods
            zodiac={horoscope._zodiac}
            houseSystem={horoscope._houseSystem}
          />
        </div>
        <div className='chart'>
          <>{planets.map((p) => (
            <>
              <p className='planet' key={p.label}>{p.label}</p>
              <p className='sign' key={p.label + p.Sign.label}>{p.Sign.label}</p>
              <GetDegreesMinutes degreesFormatted={p.ChartPosition.Ecliptic.ArcDegreesFormatted30} />
              <p className='house' key={p.label + p.House.id}>{p.House.id}</p>
            </>
          ))}</>
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
      // Update form
      setValues({
        ...formValues,
        hour: 0,
        minute: 0
      });

      // Update birthData
      birthData.unknown = true;
    } else {
      birthData.unknown = false;
    }
  }, [unknown]);

  // useLocation
  useEffect(() => {
    if (useLocation) {
      /* <- Use Location -> */
      // Success
      const successFunction = (position) => {
        // birthChart
        setValues({
          ...formValues,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        // momentChart
        MOMENTDATA.latitude = formValues.latitude;
        MOMENTDATA.longitude = formValues.longitude;
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
      // birthChart
      setValues({
        ...formValues,
        latitude: 0.00,
        longitude: 0.00
      });
      // momentChart
      MOMENTDATA.latitude = 0;
      MOMENTDATA.longitude = 0;
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
GetDateTimeLocation.propTypes = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitude: string,
  longitude: string,
}
GetDegreesMinutes.propTypes = {
  degreesFormatted: string,
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