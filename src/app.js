/* <-- ESLint Disablers --> */
/* eslint-disable no-unused-vars */

/* <-- Imports --> */
import React, { useState, useEffect } from 'react';
import { object, array } from 'prop-types';
import {
  createInstances,
  // findStellia,
  // horoscope
} from './astro.js';
import './main.css';

/* <-- Navigation UI --> */
function Nav() {
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

// const AstroDisplay = ({ year }) => {
//   console.log(year);

// const planets = horoscope._celestialBodies.all;

// console.log('forEach testing . . .');

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

//   // render() {
//   return (
//     <>
//       <p>`Horoscope`</p>
//     </>
//   );
//   // }
// }

const AstroDisplay = ({ horoscope }) => {
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
      <p>{horoscope._houseSystem}</p>
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
    chartData.longitude
  );

  /* <-- Return UI --> */
  return (
    <>
      {chartData.type === 'moment' ? (
        <ChartOfTheMoment horoscope={horoscope} />
      ) : (
        <AstroDisplay horoscope={horoscope} />
      )}
    </>
  );
}

const AstroForm = ({ birthData, months, days, hours, minutes }) => {
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
    zodiacType: 'tropical',
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

    // <- Get User Location ->
  }, [formValues])

  // unknown
  useEffect(() => {
    if (unknown) {
      // Disable hour & minute select

      // Set hour & min to 00:00
      formValues.hour = 0;
      formValues.minute = 0;

      // Update birthData
      birthData.hour = 0; // unnecessary ?
      birthData.minute = 0; // unnecessary ?
      birthData.unknown = true;

      console.log('Unknown birth time');
    }
  }, [unknown]);

  // useLocation
  useEffect(() => {
    /* <- Use Location -> */
    if (useLocation) {
      // Success
      const successFunction = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log('Location:');
        console.log(lat);
        console.log(lon);
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
      console.log('No location given');
    }


    // birthChart
    // momentChart
  }, [useLocation]);

  /* <- Handle Input Changes & Form Submission -> */
  const handleChange = async (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
    birthData[e.target.name] = e.target.value;
  }

  /* <-- Return UI --> */
  return (
    <article>
      {!submit ? (
        <>
          <h2>Enter Birth Info</h2>
          <form action='' id='birth-data'>
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

            <label htmlFor='hour' className='time'>Hour:</label>
            <select id='hour' className='time' name='hour' value={formValues.hour} onChange={handleChange}>
              {hours.map((hour) => <option key={hour.value} value={hour.value}>{hour.label}</option>)}
            </select>

            <label htmlFor='minute' className='time'>Minute:</label>
            <select id='minute' className='time' name='minute' value={formValues.minute} onChange={handleChange}>
              {minutes.map((min) => <option key={min} value={min}>{min}</option>)}
            </select>

            <label htmlFor='latitude' className='time'>Unknown:</label>
            <input type='checkbox' id='unknown' className='time' name='unknown' value={unknown} onChange={() => setUnknown(unknown => !unknown)}></input>

            <label htmlFor='latitude' className='location'>Latitude:</label>
            <input type='text' id='latitude' className='location' name='latitude' value={formValues.latitude} onChange={handleChange} />
            <label htmlFor='longitude' className='location'>Longitude:</label>
            <input type='text' id='longitude' className='location' name='longitude' value={formValues.longitude} onChange={handleChange} />
            <button type='button' id='useLocation' className='location' name='useLocation' onClick={() => setLocation(useLocation => !useLocation)}>Use my Location</button>

            <label htmlFor='zodiacType' className='system'>Zodiac:</label>
            <select id='zodiacType' className='system' name='zodiacType' value={formValues.zodiacType} onChange={handleChange}>
              <option value='tropical'>tropical</option>
            </select>

            <label htmlFor='houseSystem' className='system'>House System:</label>
            <select id='houseSystem' className='system' name='houseSystem' value={formValues.zodiacType} onChange={handleChange}>
              <option value='placidus'>placidus</option>
            </select>
            <button type='button' id='submit' name='submit' onClick={() => setSubmit(true)}>Calculate Chart</button>
          </form>
        </>
      ) : (
        <CreateHoroscope chartData={birthData} />
      )}
    </article>
  );
}

const ChartOfTheMoment = ({ horoscope }) => {

  /* <-- Initial Logs --> */
  console.log(`Chart of the Moment:`);
  console.log(horoscope);
  console.log(`. . .`);

  /* <-- Date Logs --> */
  const origin = horoscope.origin;
  console.log(`${origin.year}-${origin.month}-${origin.date} ${origin.hour}:${origin.minute}`);

  /* <-- Planet, Sign, House Logs --> */
  const planets = horoscope._celestialBodies.all;
  planets.forEach(planet => {
    const name = planet.key;
    const sign = planet.Sign.key;
    const house = planet.House.id;
    const degrees = planet.ChartPosition.Ecliptic.ArcDegreesFormatted30;
    const output = planet.isRetrograde ? `${degrees}r` : `${degrees}`;

    console.log(`${name}  |  ${sign}  | ${house}`);
    console.log(output);
    console.log(planet.ChartPosition);
  });

  // console.log('forEach testing . . .');

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
      <article>
        <h2>Chart of The Moment</h2>
      </article>
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
}
CreateHoroscope.propTypes = {
  chartData: object
}
AstroDisplay.propTypes = {
  horoscope: object
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
  latitude: 43.14,
  longitude: -80.25,
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
  longitude: -80.25
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
      />
      <CreateHoroscope chartData={MOMENTDATA} />
    </>
  );
}
export default App;